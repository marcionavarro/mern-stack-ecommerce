import React from "react";
import '../UserStyles/UserDashboard.css'

function UserDashboard(user) {
  return (
    <div>
      <img
        src={user.avatar?.url ? user.avatar.url : "./images/profile.png"}
        alt="Profile Picture"
      />
    </div>
  );
}

export default UserDashboard;
