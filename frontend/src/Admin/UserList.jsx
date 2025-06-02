import { Delete, Edit } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../AdminStyles/UsersList.css";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import {
  clearMessage,
  deleteUser,
  fetchUsers,
  removeErrors,
} from "../features/admin/adminSlice";

function UserList() {
  const { users, loading, error, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("UserList:: ", users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }

    if (message) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(clearMessage());
      navigate("/admin/dashboard");
    }
  }, [dispatch, error, message]);

  const handleDelete = (userId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user ?"
    );
    if (confirm) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : users && users.length > 0 ? (
        <>
          <PageTitle title="Users List" />
          <Navbar />
          <div className="usersList-container">
            <h1 className="usersList-title">All Users</h1>
            <div className="usersList-table-container">
              <table className="usersList-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{new Date(user.createdAt).toLocaleString()}</td>
                      <td>
                        <Link
                          to={`/admin/user/${user._id}`}
                          className="action-icon edit-icon"
                        >
                          <Edit />
                        </Link>
                        <button
                          className="action-icon delete-icon"
                          onClick={() => handleDelete(user._id)}
                        >
                          <Delete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <PageTitle title="Users List" />
          <Navbar />
          <div className="no-orders">
            <p className="no-order-message">No Users Found</p>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default UserList;
