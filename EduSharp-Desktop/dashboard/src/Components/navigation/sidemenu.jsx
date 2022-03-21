import React,{useState,useEffect} from "react";
import logo from "../images/image.png";
import "../StyleSheet.css";
import "font-awesome/css/font-awesome.min.css";
import { Link,useNavigate } from "react-router-dom";
import SidenavBtn from "../ReuseblesComps/SideNav/SidenavBtn";
import reuse from "../Authentication-firebase/reuse";
import Users from "../Authentication-firebase/reuse"
import LinkNav from "./linkNav";

export const Sidemenu = () => {

  const[pdffile,setPdfFile]=useState()
  const navigate = useNavigate()

  const handlesubmit=()=>{
   // console.log('adasdada')
  reuse.addItem("LO",12,"something","topic",pdffile,pdffile.name,"books")
  //  console.log(pdffile.name,'--------------------------------')
  
  }
  const fileType=['application/pdf']
  
  const handleFileChange=(e)=>{
    let selectedfile=e.target.files[0]
    if(selectedfile){
        if(selectedfile&&fileType.includes(selectedfile.type)){
          let reader=new FileReader();
          reader.readAsDataURL(selectedfile)
          reader.onloadend=(e)=>{
            setPdfFile(e.target.result)
            console.log(pdffile,'--------------------------------')
          }
        }else{
          setPdfFile(null)
          //handle errorr
        }
    }else{
      console.log('select a file')
    }
  }
  const LogOut = ()=>{
Users.signOut(navigate)
  }
  return (
    <>


    <div className="menu-container">
      
     <LinkNav/>
   
    
      <div className="text">
        <h2>Taking Education To new heights for learners in high school</h2>
        <p>Having access to information about all sorts of topics regarding a learner's subjects.This great website is the best option for inquisitive children who ask questions about everything.It is more than resourceful .Practice math skills by doing activities in mathematical operations, fractions, word problems, and more!</p>
      </div>
      
    </div>
    <div className="grids">
        <Link to={'/AddLesson'}>
      <div className="card1">
      <h2>Lessons</h2>
        <p>
          Adding different types of lessons that are available for the client to view or participate in. This section includes, uploading lessons, editing them and deleting the lesson that is no longer used
        </p>
      </div>
        </Link> 
 <Link to={'/AddQuestion'}>
      <div className="card2">
       <h2>Question Papers</h2>
        <p>
          Adding different types of question papers that are available for the client to view or download. This section includes, uploading question paper, editing them and deleting the question papers that is no longer used
        </p>
      </div>
         </Link>
          <Link to={'/AddBook'}>
      <div className="card3">
             <h2>Books</h2>
       
        <p>
          Adding different types of books that are relevant to the registered subjects and are available for the client to view or participate in. This section includes, uploading books, managing them and deleting the books that is no longer used
        </p>

      </div>
       </Link>
    </div>
    </>
  );
};
