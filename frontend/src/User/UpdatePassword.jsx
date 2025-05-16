import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import "../UserStyles/Form.css";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassowrd", confirmPassowrd);
    for (let pair of myForm.entries()) {
      console.log(pair[0] + "-" + pair[1]);
    }
  };

  return (
    <>
      <Navbar />
      <PageTitle title="Password Update" />
      <div className="update-container">
        <div className="form-content">
          <form className="form" onSubmit={updatePasswordSubmit}>
            <h2>Update Password</h2>

            <div className="input-group">
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassowrd}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="authBtn">Upadte Password</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdatePassword;
