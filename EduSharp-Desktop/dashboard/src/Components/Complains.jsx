import React,{useState,useEffect} from "react";
import logo from "./images/image.png";
import info from "./images/info.png";
import "./StyleSheet.css";
import "font-awesome/css/font-awesome.min.css";
import { Link,useNavigate } from "react-router-dom";
import SidenavBtn from "./ReuseblesComps/SideNav/SidenavBtn";
import reuse from "./Authentication-firebase/reuse";
import Users from "./Authentication-firebase/reuse"
import "./notification.css";
import { Button } from "bootstrap";
export const Complaints = () => {
  const navigate = useNavigate()
  const LogOut = ()=>{
    Users.signOut(navigate)
      }

  return (
    <>
    <div className="menu-container">
      <div id="link">
          <div className="head-container">
        <img src={logo} alt="" className="picture" width={50} height={50}></img>
        <h2>EduSharp</h2>
      </div>
      <div className="screens">
       
        <ul  >
          <li><a href="/home">Home</a></li>
          <li><a href="/Notification">Notifications</a></li>
          <li><a href="/complaint">Complaints</a></li>
          <li><a href="/users">Manage Users</a></li>
         <li><button type={"submit"} onClick={LogOut} className={'signOut'}>Sign Out</button></li>

        </ul>

      </div>
      </div>
      <div className="NotificationPanel">

      <h1>Complains</h1>
      <div className="Notification-Card">
           <h6>Tau B -- 20 March 2022 -- 05:00 pm</h6> 
           
           <p>Message : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <button> More Details</button>
      </div>
      <div className="Notification-Card">
           <h6>Tau B -- 20 March 2022 -- 05:00 pm</h6> 
           
           <p>Message : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <button> More Details</button>
      </div>
      </div>
    
      
    </div>

    </>
  );
};
