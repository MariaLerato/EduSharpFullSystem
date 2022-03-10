
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import  AddBook  from "../AddBook";
import "../AddBook.css";
import { ViewBooks } from "../../Components/ViewBooks";
import "../ViewBooks.css"
import { ReportBooks } from "../../Components/ReportBooks";
import "../ReportBooks.css"
import  AddLesson  from "../AddLesson";
import "../AddLesson.css";
import  ViewLesson  from "../ViewLessons";
import "../ViewLesson.css";
import { ReportLesson } from "../ReportLesson";
import "../ReportLesson.css";
import  AddQuestion  from "../AddQuestion";
import "../AddQuestion.css"
import { ViewPaper } from "../ViewPaper";
import "../ViewPaper.css";
import { ReportPaper } from "../ReportPaper";
import "../ReportLesson.css";
import  Home  from "../GetStarted/home";
import LogIn from "../GetStarted/signIn";
import  Register  from"../GetStarted/signUp";
// import Notification from "./Notification/Notification.jsx";
import  {Sidemenu}  from "./sidemenu";
import Landing from '../GetStarted/landingPage'
import '../StyleSheet.css'
const Menu = () => {

  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState()
   
  
    return (
        <BrowserRouter>
          {email ? (
            <div className="appMainContainer">
              <Routes>
            <Route path="/" element={<Navigate to={'/sidemenu'} replace={true}/>}/>
                <Route path={"/home"} element={<Home />} />
                <Route path={"/AddBook"} element={<AddBook />} />
                <Route path={"/AddLesson"} element={<AddLesson/>} />
                <Route path={"/AddQuestion"} element={<AddQuestion />} />
             
              </Routes>
            </div>
          ) : (
            <Routes>
                <Route path={'/signIn'} element={<LogIn setEmail={setEmail} setPassword={setPassword}/>}/>
                <Route path={'/signUp'} element={<Register setEmail={setEmail} setPassword={setPassword} />}/>
                <Route path="/" element={<Landing/>}/>
                <Route path={'/home'} element={<Home/>}/>

                <Route path={'/AddBook'} element={<AddBook/>}/>
                <Route path={'/ViewBooks'} element={<ViewBooks/>}/>
                <Route path={'/ReportBooks'} element={<ReportBooks/>}/>

                <Route path={'/AddLesson'} element={<AddLesson/>}/>
                <Route path={'/ViewLessons'} element={<ViewLesson/>}/>
                <Route path={'./ReportLesson'} element={<ReportLesson/>}/>
                
                <Route path={'/AddQuestion'} element={<AddQuestion/>}/>
                <Route path={'/ViewPaper'} element={<ViewPaper/>}/>
                <Route path={'./ReportPaper'} element={<ReportPaper/>}/>
                <Route path={'/ViewBooks'} element={<ViewBooks/>}/>
                <Route path={'./'}/>
            </Routes>
          )}
    </BrowserRouter>
  );
};
export default Menu;
