import React, { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AddBook } from "./AddBook";
import { AddLesson } from "./AddLesson";
import { AddQuestion } from "./AddQuestion";
import HomePage from "./GetStarted/home";
import Landing from "./GetStarted/landingPage";
import ResetPassword from "./GetStarted/resetPassword";
import LogIn from "./GetStarted/signIn";
import Register from "./GetStarted/signUp";
import { Home } from "./home";
import { LessonPage } from "./LessonPage";
import { OverView } from "./OverView";
import { PaperReport } from "./PaperReport";




const Menu = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
   
  
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path={'/signIn'} element={<LogIn setEmail={setEmail} setPassword={setPassword}/>}/>
                <Route path={'/resetPassword'} element={<ResetPassword setEmail={setEmail} setPassword={setPassword} />}/>
                <Route path="/signUp" element={<Register/>}/>
                
                <Route path={'/home'} element={<HomePage/>}/>
                <Route path={'/AddBook'} element={<AddBook/>}/>
                <Route path={'/AddLesson'} element={<AddLesson/>}/>
                <Route path={'/AddQuestion'} element={<AddQuestion/>}/>
                <Route path={'/LessonPage'} element={<LessonPage/>}/>
                <Route path={'/OverView'} element={<OverView/>}/>
                <Route path={'/PaperReport'} element={<PaperReport/>}/>
             
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default Menu