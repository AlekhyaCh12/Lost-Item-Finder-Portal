import React, { useState } from 'react';
import './App.css';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    if (username !== "" && password !== "") {
      toggleForm();
    } else {
      alert("Please enter valid credentials.");
    }
  };

  const handleLostItemFormSubmit = async (event) => {
  event.preventDefault();
  const data = {
    itemName: event.target.itemName.value,
    description: event.target.description.value,
    contactEmail: event.target.contactEmail.value,
  };

  const response = await fetch('http://localhost:3001/add-item', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  alert(result.message);
};

  return (
    <div className="container">
      <h1>🔍 Lost Item Finder Portal</h1>
      {showLoginForm ? (
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLoginFormSubmit}>
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="form-container lost-item-form">
          <h2>Report a Lost Item</h2>
          <form onSubmit={handleLostItemFormSubmit}>
            <label>Item Name:</label>
            <input type="text" name="itemName" required />
            <label>Description:</label>
            <textarea name="description" required></textarea>
            <label>Contact Email:</label>
            <input type="email" name="contactEmail" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
