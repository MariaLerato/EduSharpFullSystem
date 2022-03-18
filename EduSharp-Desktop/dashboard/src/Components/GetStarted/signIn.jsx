import React, { useState } from "react";
import "./style.css";
import logo from "../images/image.png";
import { useNavigate } from "react-router-dom";
import Users from "../Authentication-firebase/reuse";
import CircularProgress from "@mui/material/CircularProgress";
// import Button from '@mui/material/Button';

const LogIn = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const SignIn = (e) => {
    e.preventDefault();
    setLoad(true);
      Users.login(email, password, navigate,setLoad);
      
  };
  return (
    <div className="ContainerRegister">
      <div className="backBody">
        <div className="head">
          <div className="logo">
            <img src={logo} alt={"edusharp"} width={50} height={50} />
            <h3>EduSharp</h3>
          </div>
          <h3>Administration</h3>
        </div>
        <div className="signBody" style={{ marginTop: "8%" }}>
          <div className="headings">
            <h1>Sign In To Your Account.</h1>
          </div>

          <form className="Register" onSubmit={SignIn}>
            <div></div>
            {/* other inputs */}
            <div className="input-icons">
              {/* <i className='fa fa-envelope fa-2x'></i> */}
              <input
                type="email"
                placeholder="Email Address"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-icons">
              {/* <i className='fa fa-eye fa-2x'></i> */}
              <input
                type="password"
                placeholder="Enter Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="forgotButton"
              onClick={() => navigate("/resetPassword")}
            >
              Forgot Password?
            </button>
            <div className="buttons">
              {load && <CircularProgress color="success"/>}
              <button className="logButton" onClick={SignIn} type={"submit"}>
                Log In To Account
              </button>
            </div>
            <p>
              Don't have an account? <a href="signUp">Register Account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
