import React, { useState } from "react";
import "../UserStyles/Form.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/profile.png");
  

  return (
    <>
      <Navbar />
      <div className="update-container">
        <div className="form-content">
          <form className="form">
            <h2>Update Profile</h2>
            <div className="input-group avatar-group">
              <input type="file" accept="image/" className="file-input" />
              <img src={avatarPreview} alt="User profile" className="avatar" />
            </div>
            <div className="input-group">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-group">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button className="authBtn">Upadte</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UpdateProfile;
