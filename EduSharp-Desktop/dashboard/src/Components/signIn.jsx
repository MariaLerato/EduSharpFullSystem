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
    <div className="container">
    <form className="RegisterForm" onSubmit={onSubmit}>
      <div className="sub">
        <img src={logo} alt="logo" />
        <h2 className="heading">Sign In</h2>
      </div>
      <div>
   
        
        <input
          type={"email"}
          placeholder={"Enter Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />{" "}
        <input
          type={"password"}
          placeholder={"Enter Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />{" "}
     
     
        <div className="signin">
          <a className="signin" href="reset">Forgot Password?</a>
        </div>
        <button type="submit" className="submit">
          Sign In
        </button>
        <div className="links">
            <p className="sign">Dont Have An Account?<a className="in" href="signUp"> Sign Up</a> </p>
       
          </div>
        
      </div>
    </form>
  </div>
  );
};
