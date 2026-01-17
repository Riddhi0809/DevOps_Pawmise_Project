import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { petProducts } from "./Data";
import "./Adopt.css";
import "./Shop.css";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = petProducts.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Product not found.</p>;

  const handleShopNow = async () => {
    try {
      // Step 1: create the order on backend for Razorpay
      const response = await fetch("http://localhost:5000/api/payment/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: product.price * quantity,
        }),
      });

      const order = await response.json();

      const options = {
        key: "rzp_test_RUCqpTtWXrWZGc", 
        amount: order.amount,
        currency: order.currency,
        name: product.name,
        description: product.description,
        order_id: order.id,
        handler: (response) => {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

     
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="product-page-container">
      <button onClick={() => navigate(-1)}>Back to Shop</button>
      <h2>{product.name}</h2>
      <img src={product.url} alt={product.alt} className="product-img" />
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <label>
        Quantity:
        <input
          type="number"
          min="1"
          max={product.quantityAvailable || 10}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </label>
      <button onClick={handleShopNow}>Shop Now</button>
    </div>
  );
}
