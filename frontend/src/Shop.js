import { useNavigate } from "react-router-dom";
import { petProducts } from "./Data";
import "./Adopt.css";
export default function Shop() {
  const navigate = useNavigate();
  return (
    <div className="adopt-grid-container">
      <h2 className="adopt-title">Shop for a Cause!!</h2>
      <div className="pet-grid">
        {petProducts.map((product) => (
          <div className="pet-card" key={product.id}>
            <img
              src={product.url}
              alt={product.alt}
              className="pet-img"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <h3 className="pet-name">{product.name}</h3>
            <p className="pet-price">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
