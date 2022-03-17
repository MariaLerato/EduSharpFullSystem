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
export const Notification = () => {
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
     

      <h1>Notifications</h1>
      <div className="Panel">
        <div className="wrapper" >
              <div className="toastsuccess">
                  <div className="container-1">
                  <img src={info} alt="" className="picture" width={35} height={35}></img>
                  </div>
                  <div className="container-2">
                  <p>Success</p>
                   <p>Your changes are saved successfully</p>
                  </div>
                  <button>&times;</button>
                    </div>
        
       
        </div>
        <div className="wrapper" >
              <div className="toastsuccess">
                  <div className="container-1">
                  <img src={info} alt="" className="picture" width={35} height={35}></img>
                  </div>
                  <div className="container-2">
                  <p>Success</p>
                   <p>Your changes are saved successfully</p>
                  </div>
                  <button>&times;</button>
                    </div>
        
       
        </div>
      </div>
    
      
    </div>

    </>
  );
};
