import user from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


// Sign Up
export const signUp= async(req, res)=>{

  try{
    console.log("Backend par data puhanch gaya: ", req.body);
    const {name, email,password}= req.body;

    const existingUser= await user.findOne({email});

    if (existingUser){
      return res.send("User already Exist")
    }

    //hash password

    const hashpassword= await bcrypt.hash(password,10)

    //createUser

    await user.create({
      name,
      email,
      password:hashpassword
    })

    res.status(201).json({ message: "User Created Successfully" });

  } catch(error){
    res.send("Error")
  }
  
}

//Sign In



//Sign In
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userCheck = await user.findOne({ email });
    if (!userCheck) {
      return res.status(500).json({ message: "User Not Found" }); // return lagana zaroori hai
    }

    // password check 
    const check = await bcrypt.compare(password, userCheck.password);
    if (!check) {
      return res.status(400).json({ message: "Password Not Match" }); // return lagana zaroori hai
    }

    //GWT TOKEN
    const token = jwt.sign(
      { id: userCheck._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successfull",
      token,
      user: {
        id: userCheck._id,       // ✅ FIX: user ki jagah userCheck
        name: userCheck.name,    // ✅ FIX: user ki jagah userCheck
        email: userCheck.email   // ✅ FIX: user ki jagah userCheck
      }
    });

  } catch (error) {
    return res.status(400).json({ message: "Server Error", error });
  }
}








