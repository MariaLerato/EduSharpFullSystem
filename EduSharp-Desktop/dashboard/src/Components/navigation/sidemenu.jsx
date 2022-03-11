import React,{useState} from "react";
import logo from "../images/image.png";
import "../StyleSheet.css";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import SidenavBtn from "../ReuseblesComps/SideNav/SidenavBtn";
import reuse from "../Authentication-firebase/reuse";

export const Sidemenu = () => {
  const[pdffile,setPdfFile]=useState()

  const handlesubmit=()=>{
  reuse.addItem("LO",12,"something","topic",pdffile,pdffile.name,"books")
  
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
        {/* <div className="active"></div> */}
        <ul  >
      
          <li><a href="/home">Home</a></li>
          <li><a href="/notifications">Notifications</a></li>
          <li><a href="/complaint">Complaints</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/users">Manage Users</a></li>
        </ul>
        {/* <SidenavBtn title="Home" path="/home" current="home"/>
        <SidenavBtn title="Notifications" path="/Notification" current="Notification"/>
        <SidenavBtn
         
          title="Complaints"
          path="/Complaints"
          current="Complaints"
        />
        <SidenavBtn  title="Profile" path="/Profile"  current="Profile"/>
        <SidenavBtn  title="Manage Users" path="/ManageUsers"  current="ManageUsers"/> */}
     
      </div>
      </div>
    
      <div className="text">
        <h2>Taking Education To new heights for learners in high school</h2>
        <p>Having access to information about all sorts of topics regarding a learner's subjects.This great website is the best option for inquisitive children who ask questions about everything.It is more than resourceful .Practice math skills by doing activities in mathematical operations, fractions, word problems, and more!</p>
      </div>
      
    </div>
    <div className="grids">
      <div className="card1">
    <Link to={'./AddLesson'}>
      <h2>Lessons</h2>
    </Link> 
        <p>
          Adding different types of lessons that are available for the client to view or participate in. This section includes, uploading lessons, editing them and deleting the lesson that is no longer used
        </p>

      </div>
      <div className="card2">
       <Link to={'./AddQuestion'}>
       <h2>Question Papers</h2>
       </Link> 
        <p>
          Adding different types of question papers that are available for the client to view or download. This section includes, uploading question paper, editing them and deleting the question papers that is no longer used
        </p>

      </div>
      <div className="card3">
        <Link to={'./AddBook'}>
             <h2>Books</h2>
        </Link>
   
        <p>
          Adding different types of books that are relevant to the registered subjects and are available for the client to view or participate in. This section includes, uploading books, managing them and deleting the books that is no longer used
        </p>

      </div>
    </div>
    </>
  );
};
