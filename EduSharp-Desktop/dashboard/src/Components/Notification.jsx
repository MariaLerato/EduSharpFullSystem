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
import LinkNav from "./navigation/linkNav";
export const Notification = () => {
  const navigate = useNavigate()
  const LogOut = ()=>{
    Users.signOut(navigate)
      }

  return (
    <>
    <div className="-container">
    <LinkNav/>
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
