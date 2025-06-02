import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../AdminStyles/UpdateRole.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { getSingleUser } from "../features/admin/adminSlice";

function UpdateRole() {
  const { userId } = useParams();
  const { user, success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const { name, email, role } = formData;

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);

  return (
    <>
      <PageTitle title="Update Role User" />
      <Navbar />
      <div className="page-wrapper">
        <div className="update-user-role-container">
          <h1>Update User Role</h1>
          <form className="update-user-role-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" id="name" value={name} readOnly />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select type="text" name="role" id="role" value={role} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="btn btn-primary">Update Role</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateRole;
