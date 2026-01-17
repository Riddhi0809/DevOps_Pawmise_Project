import React, { useState } from "react";
import { furry } from "./Pet";
import Form from "./Form";
import "./Adopt.css";

export default function Adopt() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    when: "",
  });

  // Show pet details in a modal on image click, not the form
  const handlePetImageClick = (pet) => {
    setSelectedPet(pet);
    setShowForm(false);
  };


  // Show form modal on "Meet Me!!" click
  const handleMeetMeClick = () => {
    setShowForm(true);
  };

  // Update form state as user types
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (async)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ petName: selectedPet.name, ...formData }),
    });
    if (res.ok) {
      alert('Visit scheduled successfully!');
      setSelectedPet(null);
      setShowForm(false);
      setFormData({ name: '', address: '', city: '', phone: '', Date: '' });
    } else {
      alert('Error scheduling visit, please try again.');
    }
  };

  return (
    <>
      <div className="adopt-grid-container">
        <h2 className="adopt-title">Meet Our Buddies!!</h2>
        <div className="pet-grid">
          {furry.map((pet, index) => (
            <div className="pet-card" key={index}>
              <img
                src={pet.url}
                alt={pet.alt}
                className="pet-img"
                style={{ cursor: "pointer" }}
                onClick={() => handlePetImageClick(pet)}
              />
              <h3 className="pet-name">{pet.name}</h3>
              <p className="pet-age"><strong>Age:</strong> {pet.age}</p>
              <p className="pet-breed"><strong>Breed:</strong> {pet.breed}</p>
              {/* Short description optional here */}
            </div>
          ))}
        </div>

        {/* Modal - Show full details */}
        {selectedPet && !showForm && (
          <div className="modal-bg">
            <div className="modal">
              <button
                className="modal-close"
                onClick={() => setSelectedPet(null)}
              >
                &times;
              </button>
              <h2>{selectedPet.name}</h2>
              <img src={selectedPet.url} alt={selectedPet.name} className="modal-pet-image" />
              <p><strong>Age:</strong> {selectedPet.age}</p>
              <p><strong>Breed:</strong> {selectedPet.breed}</p>
              <p>{selectedPet.description}</p>
              <button className="meet-me-btn" onClick={handleMeetMeClick}>
                Meet Me!!
              </button>
            </div>
          </div>
        )}

        {/* Modal - Show form if Meet Me!! clicked */}
        {selectedPet && showForm && (
          <div className="modal-bg">
            <div className="modal">
              <button
                className="modal-close"
                onClick={() => {setSelectedPet(null); setShowForm(false);}}
              >
                &times;
              </button>
              <Form
                petName={selectedPet.name}
                formData={formData}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
