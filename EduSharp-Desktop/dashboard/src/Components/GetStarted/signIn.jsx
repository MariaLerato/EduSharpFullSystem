import React, { useState } from "react";
import "./style.css";
import logo from "../images/image.png";
import { useNavigate } from "react-router-dom";
import Users from "../Authentication-firebase/reuse";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const LogIn = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [load, setLoad] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const SignIn = (e) => {
    e.preventDefault();
    // setLoad(true);
    setOpen(true)
      Users.login(email, password, navigate,setLoad)
      .then((res) => {
        console.log('status',res.status)
        if(res.status==='success'){
          // setMessage(res.message)
          setOpen(false);
          setOpenSnackbar(true)
          console.log("signedUp", res);
        }else{
          setMessage(res.message)
          setIsError(true)
        }
      })
      .catch((error) => {
        console.log("some error happened", error);
      });
      
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
          <div className="headings" >
            <h1 style={{fontSize:35}}>Sign In To Your Account.</h1>
          </div>

          <form className="Register" onSubmit={SignIn}>
          
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
              <button className="logButton" onClick={SignIn} type={"submit"}>
                Log In To Account
              </button>
            </div>
            <p>
              Don't have an account? <a href="signUp">Register Account</a>
            </p>
          </form>
        </div>
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
      </div>
    </div>
  );
};

export default LogIn;
