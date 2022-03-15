import React from 'react'
import Users from '../Authentication-firebase/reuse'
import { Link } from 'react-router-dom'
import logo from '../images/image.png'
const LogOut = ()=>{
  Users.signOut(navigate)
    }

const LinkNav = () => {
  return (
    <div id="link" className='bann'>
    <div className="head-container">
  <img src={logo} alt="" className="picture" width={50} height={50}></img>
  <h2>EduSharp</h2>
</div>
    <div className="screens">
    <ul  >  
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/notifications">Notifications</Link></li>
      <li><Link to="/complaint">Complaints</Link></li>
      <li><Link to="/manageUsers">Manage Users</Link></li>
     <li><button type={"submit"} onClick={LogOut} className={'signOut'}>Sign Out</button></li>

    </ul>    
  </div>
  </div>
  )
}

export default LinkNav