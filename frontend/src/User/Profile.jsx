import "../UserStyles/Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-image">
        <h1 className="profile-heading">My Profile</h1>
        <img src="" alt="User Profile" className="profile-image" />
        <Link to="/profile/update">Edit Profile</Link>
      </div>
      <div className="profile-details">
        <div className="profile-detail">
          <h2>Username:</h2>
          <p>Fullstack</p>
        </div>
        <div className="profile-detail">
          <h2>Email:</h2>
          <p>mnfullstack@email.com</p>
        </div>
        <div className="profile-detail">
          <h2>Joined On:</h2>
          <p>March 24 2025</p>
        </div>
      </div>
      <div className="profile-buttons">
        <Link to="/orders/user">My Orders</Link>
        <Link to="/password/update">Change Password</Link>
      </div>
    </div>
  );
}

export default Profile;
