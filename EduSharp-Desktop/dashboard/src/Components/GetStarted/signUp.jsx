import React,{useState} from 'react'
import './style.css'
import logo from '../images/image.png'
import Users from '../Authentication-firebase/reuse'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Register = () => {
  const [firstname, setName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [load, setLoad] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const SignUp = (e) => {
    e.preventDefault();
    setOpen(true);
    Users.signUp(email, password, firstname, lastname)
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
            <h3 color="white">EduSharp</h3>
          </div>
          <h3>Administration</h3>
        </div>
        <div className="signBody">
          <div className="headings">
            <h1>Create new account.</h1>
          </div>

          <form className="Register" onSubmit={SignUp}>
            <div>
              <div className="input-icons">
                <input
                  type="text"
                  placeholder="First name"
                  className="input-field"
                  value={firstname}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-icons">
                <input
                  type="text"
                  placeholder="last name"
                  className="input-field"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
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
                placeholder="Create Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="buttons">
              <button className="create" onClick={SignUp} type={"submit"}>
                Create Account
              </button>
            </div>
            <p>
              Already have an account? <a href="signIn">Sign in</a>
            </p>
          </form>
        </div>
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={`${!isError ? "success" : "error"}`}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      </div>
      
    </div>
  );
};

export default Register;
