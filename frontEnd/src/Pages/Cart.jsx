import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router"; 

export default function Cart() { // 1. Component name Capitalized
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  // Load cart
  const loadCart = async () => {
    if (!userId) {
      return;
    } else {
      try {
        const res = await api.get(`/cart/${userId}`);
        setCart(res.data);
      } catch (error) {
        console.error("Cart load failed", error);
      }
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Remove Item from Cart 
  const removeItem = async (productId) => {
    await api.post(`/cart/remove`, { userId, productId }); // 2. Fixed string interpolation missing /
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Update item Quantity in cart
  const updateQuantity = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    } else {
      await api.post(`/cart/update`, { userId, productId, quantity });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated")); 
    }
  };

  // 3. THE FIX: Added 'return' statement so it stops here while loading
  if (!cart) {
    return <div className="text-center mt-10 text-xl font-bold">Loading Cart...</div>;
  }

  // 4. Fixed scope issue and typo in 'quantity'
  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity, 0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-gray-600 text-lg">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center justify-between p-4 border rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.productId.title}
                  </h2>
                  <p className="text-gray-600">
                    ${item.productId.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  // 5. Fixed function name from updateQty to updateQuantity
                  onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  // 5. Fixed function name from updateQty to updateQuantity
                  onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold"
                >
                  +
                </button>
              </div>
              <div>
                <p className="font-semibold text-lg">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.productId._id)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6 border-t pt-4">
            <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
          </div>
          <button 
            onClick={() => navigate("/checkout-address")} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}