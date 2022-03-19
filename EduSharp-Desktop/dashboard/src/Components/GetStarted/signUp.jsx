import React,{useState} from 'react'
import './style.css'
import logo from '../images/image.png'
import Users from '../Authentication-firebase/reuse'
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const [firstname, setName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [load, setLoad] = useState(false);

  const SignUp = (e) => {
    e.preventDefault();
    setLoad(true);
    Users.signUp(email, password, firstname, lastname);
    console.log("sent");
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
                {/* <i className='fa fa-id-card fa-2x'></i> */}
                <input
                  type="text"
                  placeholder="First name"
                  className="input-field"
                  value={firstname}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-icons">
                {/* <i className='fa fa-id-card fa-2x'></i> */}
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
              {/* <button className='forgotButton'>Forgot Password</button> */}
              {load && 
              <div className="progressLoader">
              <CircularProgress color="primary"/>
              </div>
              }
              <button className="create" onClick={SignUp} type={"submit"}>
                Create Account
              </button>
            </div>
            <p>
              Already have an account? <a href="signIn">Sign in</a>
            </p>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Register;
