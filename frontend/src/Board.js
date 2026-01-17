import React, { useState } from "react";
import "./Board.css";

export default function Board() {
  const [formData, setFormData] = useState({
    petName: "",
    species: "",
    ownerName: "",
    ownerContact: "",
    vaccinationHistory: "",
    boardFrom: "",
    boardTill: ""  // New field
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    setUploading(true);
    const cloudName = "dsxrjty7s";
    const unsignedUploadPreset = "pet_boarding_upload";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", unsignedUploadPreset);

    const res = await fetch(url, { method: "POST", body: data });
    const file = await res.json();
    setImageUrl(file.secure_url);
    setUploading(false);
    return file.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalImageUrl = imageUrl;
    if (image && !imageUrl) {
      finalImageUrl = await handleImageUpload();
    }

    const fullData = {
      ...formData,
      imageUrl: finalImageUrl,
    };

    await fetch("http://localhost:5000/api/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData)
    });

    alert("Boarding request submitted:\n" + JSON.stringify(fullData, null, 2));
    setFormData({
      petName: "",
      species: "",
      ownerName: "",
      ownerContact: "",
      vaccinationHistory: "",
      boardFrom: "",     // Reset new fields as well
      boardTill: ""
    });
    setImage(null);
    setImageUrl("");
  };

  return (
    <form className="boarding-form" onSubmit={handleSubmit}>
      <h2>Board Your Animal</h2>
      <input
        name="petName"
        placeholder="Pet's Name"
        value={formData.petName}
        onChange={handleChange}
        required
      />
      <input
        name="species"
        placeholder="Species (e.g., Dog, Cat)"
        value={formData.species}
        onChange={handleChange}
        required
      />
      <input
        name="ownerName"
        placeholder="Owner's Name"
        value={formData.ownerName}
        onChange={handleChange}
        required
      />
      <input
        name="ownerContact"
        placeholder="Owner's Contact"
        value={formData.ownerContact}
        onChange={handleChange}
        required
      />
      <p>You are required to bring the vaccination proof while boarding your pet</p>
      <textarea
        name="vaccinationHistory"
        placeholder="Vaccination History"
        value={formData.vaccinationHistory}
        onChange={handleChange}
        required
      />
      {/* New Board From field */}
      <label htmlFor="boardFrom">Board From:</label>
      <input
        type="date"
        id="boardFrom"
        name="boardFrom"
        value={formData.boardFrom}
        onChange={handleChange}
        required
      />
      {/* New Board Till field */}
      <label htmlFor="boardTill">Board Till:</label>
      <input
        type="date"
        id="boardTill"
        name="boardTill"
        value={formData.boardTill}
        onChange={handleChange}
        required
      />
      <p>Paste your pet's image here: </p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      {uploading ? <p>Uploading image...</p> : null}
      {imageUrl ? <img src={imageUrl} alt="Uploaded pet" style={{ maxWidth: 200 }} /> : null}
      <button type="submit" className="board-btn">Submit Boarding Request</button>
    </form>
  );
}
