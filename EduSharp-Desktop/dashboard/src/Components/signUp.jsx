import React, { useState } from "react";
import logo from "./images/image.png";
import "./StyleSheet.css";
import Users from "./reuse";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  const onSubmit = (e) => {

    e.preventDefault();
    Users.signUp(email, password, name);
    console.log(email, "user created");
   

  };
  return (
    <div className="container">
      <form className="RegisterForm" onSubmit={onSubmit}>
        <div className="sub">
          <img src={logo} alt="logo" />
          <h2 className="heading">Register Account</h2>
        </div>
        <div>
          <input
            type={"text"}
            placeholder={"Enter Full Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />{" "}
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
          <input
            type={"password"}
            placeholder={"Confirm Password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <br />{" "}
          <button type="submit" className="submit">
            Sign Up
          </button>
          <div className="links">
            <p className="sign">Already Have An Account?<a className="in" href="signIn"> Sign In</a> </p>
       
          </div>
        </div>
      </form>
    </div>
  );
};
