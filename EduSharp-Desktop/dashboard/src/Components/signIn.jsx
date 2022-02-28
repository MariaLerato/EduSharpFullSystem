import React, { useState, useEffect } from "react";
import logo from "./images/image.png";
import "./StyleSheet.css";
import { Link, useNavigate } from "react-router-dom";
import Users from "./reuse";

export const Signin = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    Users.getData().on("value", (data) => {
      const userData = [];
      data.forEach((data) => {
        const info = data.val();
        const key = data.key;
        userData.push({
          key: key,
          name: info.name,
          surname: info.surname,
        });
        setUsers(userData);
      });
    });
  });
  const onSubmit = (e) => {
    e.preventDefault();
    Users.login(email, password, navigate);
    // navigate('/home')
  };
  return (
    <div className="section group">
      <div >
        <div class="col span_1_of_2"></div>
        <div class="col span_1_of_2"></div>
      </div>
      <div className="login-container">
        <div className="header">
          <div
            className="semiheader"
            style={{ paddingRight: "2%", display: "flex" }}
          >
            <h1 className="head">Edu</h1>
            <h1 className="sharp">Sharp</h1>
          </div>
          <h1 className="admin">Admin System</h1>
        </div>
        <div className="login-content-container">
          <img src={logo} alt="image" className="images" />
          <div className="login-content">
            <form className="login-Input">
              <h2>Sign In</h2>
              <input
                type={"email"}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type={"password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <h3> Forgot Password ? </h3>
            <button type={"submit"} onClick={onSubmit} className="button-log">
              Sign In
            </button>
            <div className="link">
              <h4>Don't have an account?</h4>
              <Link to={"/"}>
                {" "}
                <h4 style={{ color: "red" }}>Register</h4>
              </Link>
            </div>
          </div>
        </div>
        <footer className="footer">
          <h2></h2>
        </footer>
      </div>
    </div>
  );
};
