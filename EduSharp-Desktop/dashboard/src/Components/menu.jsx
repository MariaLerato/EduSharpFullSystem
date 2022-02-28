import React, { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AddBook } from "./AddBook";
import { AddLesson } from "./AddLesson";
import { AddQuestion } from "./AddQuestion";
import { Home } from "./home";
import { LessonPage } from "./LessonPage";
import { OverView } from "./OverView";
import { PaperReport } from "./PaperReport";
import { Signin } from "./signIn";
import { SignUp } from "./signUp";



const Menu = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
   
  
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/signIn'} element={<Signin setEmail={setEmail} setPassword={setPassword}/>}/>
                <Route path={'/'} element={<SignUp setEmail={setEmail} setPassword={setPassword} />}/>
                
                <Route path={'/home'} element={<Home/>}/>
                <Route path={'/AddBook'} element={<AddBook/>}/>
                <Route path={'/AddLesson'} element={<AddLesson/>}/>
                <Route path={'/AddQuestion'} element={<AddQuestion/>}/>
                <Route path={'/LessonPage'} element={<LessonPage/>}/>
                <Route path={'/OverView'} element={<OverView/>}/>
                <Route path={'/PaperReport'} element={<PaperReport/>}/>
                {/* <Route path={'/'} element={<SignUp/>}/>
                <Route path={'/'} element={<SignUp/>}/>
                <Route path={'/'} element={<SignUp/>}/> */}
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default Menu