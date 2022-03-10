
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { AddBook } from "../AddBook";
import "../AddBook.css";
import { ViewBooks } from "../../Components/ViewBooks";
import "../ViewBooks.css"
import { ReportBooks } from "../../Components/ReportBooks";
import "../ReportBooks.css"
import { AddLesson } from "../AddLesson";
import "../AddLesson.css";
import  ViewLesson  from "../viewLesson";
import "../ViewLesson.css";
import { ReportLesson } from "../ReportLesson";
import "../ReportLesson.css";
import { AddQuestion } from "../AddQuestion";
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
import reuse from "../Authentication-firebase/reuse";

const Menu = () => {

 
  
    return (
        <BrowserRouter>
          {reuse.isLogIn() ? (
            <div className="appMainContainer">
              <Routes>
                <Route path="/" element={<Navigate to={'/home'} replace={true}/>}/>
                <Route path="/signIn" element={<Navigate to={'/home'} replace={true}/>}/>
                <Route path="/signUp" element={<Navigate to={'/home'} replace={true}/>}/>
                <Route path={"/home"} element={<Home />} />
                <Route path={"/home/AddBook"} element={<AddBook />} />
                <Route path={"/home/AddLesson"} element={<AddLesson />} />
                <Route path={"/home/AddQuestion"} element={<AddQuestion />} />
              {/* 
                <Route path={'./ViewBooks'} element={<ViewBooks/>}/>
                <Route path={'./ReportBooks'} element={<ReportBooks/>}/>
                <Route path={'./viewLesson'} element={<ViewLesson/>}/>
                <Route path={'./ReportLesson'} element={<ReportLesson/>}/>
                <Route path={'./ViewPaper'} element={<ViewPaper/>}/>
                <Route path={'./ReportPaper'} element={<ReportPaper/>}/>
                <Route path={'./ViewBooks'} element={<ViewBooks/>}/>
                 */}
              </Routes>
            </div>
          ) : (
            <Routes>
                <Route path={'/signIn'} element={<LogIn setEmail={setEmail} setPassword={setPassword}/>}/>
                <Route path={'/signUp'} element={<Register setEmail={setEmail} setPassword={setPassword} />}/>
                <Route path="/" element={<Landing/>}/> 
            </Routes>
          )}
    </BrowserRouter>
  );
};
export default Menu;
