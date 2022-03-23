import React,{useState} from 'react'
import Users from '../Authentication-firebase/reuse'
import { Link ,useNavigate} from 'react-router-dom'
import logo from '../images/image.png'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


const LinkNav = () => {
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);

  const LogOut = ()=>{
    setOpen(true);
    Users.signOut(navigate)
    .then((res) => {
      console.log('status',res.status)
      if(res.status==='success'){
        // setMessage(res.message)
        setOpen(false);
        setOpenSnackbar(true)
        console.log("signed out", res);
      }else{
        setMessage(res.message)
        setIsError(true)
      }
    })
    .catch((error) => {
      console.log("some error happened", error);
    });
  }
  return (
    <div id="link" className='bann'>
    <div className="head-container">
  <img src={logo} alt="" className="picture" width={50} height={50}></img>
  <h2>EduSharp</h2>
</div>
    <div className="screens">
    <ul  >  
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/Notification">Notifications</Link></li>
      <li><Link to="/manageUsers">Manage Users</Link></li>
     <li><button type={"submit"} onClick={LogOut} className={'signOut'}>Sign Out</button></li>
    </ul>    
  </div>
  <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  </div>
  )
}

export default LinkNav