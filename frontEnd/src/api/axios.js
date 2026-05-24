import axios from "axios"

const api= axios.create({
  baseURL:'https://mern-ecommerce-platform-1vft.onrender.com/api'
})

export default api