import React, { useEffect, useState } from "react";
import "../UserStyles/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, removeErrors, removeSuccess } from "../features/user/userSlice";
import { toast } from "react-toastify";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginassword] = useState("");
  const { error, loading, success, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }91202501231
  }, [dispatch, error]);

  useEffect(() => {
    
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (success) {
       toast.success("Login Successful", { position: "top-center", autoClose: 3000 });
       dispatch(removeSuccess())
    }
  }, [dispatch, success]);

  return (
    <div className="form-container">
      <div className="form-content">
        <form className="form" onSubmit={loginSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginassword(e.target.value)}
            />
          </div>
          <button className="authBtn">Sign In</button>
          <p className="form-links">
            Forgout your password? <Link to="/password/forgot">Reset Here</Link>
          </p>
          <p className="form-links">
            Don't have an account <Link to="/register">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
