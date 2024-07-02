import React, { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSettingsUpdate = (e) => {
    e.preventDefault();
  
    // Validate the input data
    if (!name || !email || !oldPassword || !newPassword) {
      alert("Please fill in all fields");
      return;
    }
  
    if (!validateEmail(email)) {
      alert("Invalid email address");
      return;
    }
  
    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters long");
      return;
    }
  
    fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        oldPassword,
        newPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Settings updated successfully!");
        // Reset the form fields
        setName("");
        setEmail("");
        setOldPassword("");
        setNewPassword("");
      } else {
        alert("Error updating settings: " + data.error);
      }
    })
    .catch(error => {
      console.error(error);
      alert("Error updating settings: " + error.message);
    });
  };
  
  // Email validation function
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px", padding: 20}}>
      <h3 style={{ marginTop: 0, fontWeight: "bold", color: "#333" }}>Settings</h3>
      <form onSubmit={handleSettingsUpdate} style={{ marginTop: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 10, fontWeight: "bold", color: "#333" }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", height: 40, padding:2, fontSize: 16, border: "1px solid #ccc", borderRadius:"15px" }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 10, fontWeight: "bold", color: "#333" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", height: 40, padding:2, fontSize: 16, border: "1px solid #ccc", borderRadius:"15px" }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 10, fontWeight: "bold", color: "#333" }}>Old Password</label>
          <input
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={{ width: "100%", height: 40, padding:2, fontSize: 16, border: "1px solid #ccc", borderRadius:"15px" }}
          />
         
         <span style={{ position: "absolute", right: 10, top: 12 }}>
            <i
              className={showOldPassword? "fas fa-eye-slash" : "fas fa-eye"}
              onClick={(e) => { e.preventDefault(); setShowOldPassword(!showOldPassword); }}
            />
          </span>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 10, fontWeight: "bold", color: "#333" }}>New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: "100%", height: 40, padding:2, fontSize: 16, border: "1px solid #ccc", borderRadius:"15px" }}
          />
         <span style={{ position: "absolute", right: 10, top: 12 }}>
            <i
              className={showNewPassword? "fas fa-eye-slash" : "fas fa-eye"}
              onClick={(e) => { e.preventDefault(); setShowNewPassword(!showNewPassword); }}
            />
          </span>
        </div>
        <button
          type="submit"
          style={{ width: "100%", height: 40, padding: 10, fontSize: 16, border: "none", borderRadius: 5, backgroundColor: "#337ab7", color: "#fff" }}
        >
          Update Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;