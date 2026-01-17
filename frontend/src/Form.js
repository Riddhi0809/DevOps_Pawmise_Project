import React from "react";
import "./Form.css";

export default function Form({ petName,  formData, onChange, onSubmit }) {
  return (
    <form className="visit-form" onSubmit={onSubmit}>
      <h3 className="name">{petName}</h3>
     
      
      <input
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={onChange}
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={onChange}
        required
      />
      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={onChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={onChange}
        required
      />
      <label htmlFor="Date">Visit Date:</label>
      <input
        type="date"
        id="Date"
        name="when"
        value={formData.when}
        onChange={onChange}
        placeholder="YYYY-MM-DD"
      />
      <button className="adopt-btn" type="submit">
        Submit Visit Request
      </button>
    </form>
  );
}
