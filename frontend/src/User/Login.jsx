import React, { useState } from "react";
import "../UserStyles/Form.css";
import { Link } from "react-router-dom";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
  };

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
