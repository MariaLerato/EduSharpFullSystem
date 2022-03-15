
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
import { Notification } from "../Notification";
import { Complaints } from "../Complains";
// import Notification from "./Notification/Notification.jsx";
import  {Sidemenu}  from "./sidemenu";
import Landing from '../GetStarted/landingPage'
import '../StyleSheet.css'
import reuse from "../Authentication-firebase/reuse";
import ResetPassword from "../GetStarted/resetPassword";

const Menu = () => {

    return (
        <BrowserRouter>

          {reuse.isLogIn() ? (
            <div className="appMainContainer">
              <Routes>
              {/* <Route path={'/signIn'} element={<LogIn />}/>
                <Route path={'/signUp'} element={<Register />}/>
                <Route path="/" element={<Landing/>}/>
                <Route path="/resetPassword" element={<ResetPassword/>}/> */}
                <Route path="/" element={<Navigate to={'/home'} replace={true}/>}/>
                <Route path="/signIn" element={<Navigate to={'/home'} replace={true}/>}/>
                <Route path="/signUp" element={<Navigate to={'/home'} replace={true}/>}/>
                <Route path={"/home"} element={<Home />} />
                <Route path={"/AddBook"} element={<AddBook />} />
                <Route path={"/AddLesson"} element={<AddLesson/>} />
                <Route path={"/AddQuestion"} element={<AddQuestion />} />
              <Route path={'/ViewBooks'} element={<ViewBooks/>}/>
              <Route path={'/ViewLessons'} element={<ViewLesson/>}/>
              <Route path={'/ViewPaper'} element={<ViewPaper/>}/>
              <Route path={'/Notification'} element={<Notification/>}/>
              <Route path={'/complaint'} element={<Complaints/>}/>
              </Routes>
            </div>
          ) : (
            <Routes>
                <Route path={'/signIn'} element={<LogIn />}/>
                <Route path={'/signUp'} element={<Register />}/>
                <Route path="/resetPassword" element={<ResetPassword/>}/>
                <Route path="/" element={<Landing/>}/>
                <Route path={'/home'} element={<Home/>}/>

                <Route path={'/AddBook'} element={<AddBook/>}/>
               
                <Route path={'/ReportBooks'} element={<ReportBooks/>}/>

                <Route path={'/AddLesson'} element={<AddLesson/>}/>
                <Route path={'/ViewLessons'} element={<ViewLesson/>}/>
                <Route path={'./ReportLesson'} element={<ReportLesson/>}/>
                
                <Route path={'/AddQuestion'} element={<AddQuestion/>}/>
                <Route path={'/ViewPaper'} element={<ViewPaper/>}/>
                <Route path={'./ReportPaper'} element={<ReportPaper/>}/>
                <Route path={'/ViewBooks'} element={<ViewBooks/>}/>
                <Route path={'/Notification'} element={<Notification/>}/>
              <Route path={'/complaint'} element={<Complaints/>}/>
                <Route path={'./'}/>
            </Routes>
          )}
    </BrowserRouter>
  );
};
export default Menu;
