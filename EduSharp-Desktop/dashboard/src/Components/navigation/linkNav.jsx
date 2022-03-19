import React from 'react'
import Users from '../Authentication-firebase/reuse'
import { Link ,useNavigate} from 'react-router-dom'
import logo from '../images/image.png'



const LinkNav = () => {
  const navigate = useNavigate()
  const LogOut = ()=>{
    Users.signOut(navigate)
    console.log('455555555555555555555555555');
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
  </div>
  )
}

export default LinkNav