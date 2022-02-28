import React, { useState } from 'react';
import logo from './images/image.png'
import './StyleSheet.css'
import Users from './reuse'
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const navigate = useNavigate()
    const [name,setName] = useState()
    const [surname,setSurname] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirm,setConfirm] = useState()
   
    const onSubmit = (e)=>{
        e.preventDefault()
        Users.signUp(email,password,name)
        console.log(email,'user created')
        navigate('/home')
    }
  return (
    <div className='container'>
         <div class="section group">
        <div class="col span_1_of_2"></div>
        <div class="col span_1_of_2"></div>
      </div>
           <div className='header' >
                <div  className='semiheader' style={{paddingRight:'2%',display:'flex'}}>
                <h1 className='head'>Edu</h1>
               <h1 className='sharp'>Sharp</h1>
                </div>
               <h1 className='admin'>Admin System</h1>
           </div>
         <div className='content-container'>
                 <img src={logo} alt='' className='image'/>
             <div className='content'>
               
                 <form className='Inputs'>
                     <h2 >Sign Up</h2>
                     <input type={'text'} placeholder='First Name' onChange={(e)=>setName(e.target.value)} />
                     <input type={'text'} placeholder='Last Name' onChange={(e)=>setSurname(e.target.value)} />
                     <input type={'email'} placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)} />
                     <input type={'password'} placeholder='New Password' onChange={(e)=>setPassword(e.target.value)} />
                     <input type={'password'} placeholder='Confirm Password' />
                 </form>
                 <button type={'submit'} className='button' onClick={onSubmit}> Sign Up </button>
             </div>
         </div>
         <footer className='footer'>
            
         </footer>
    </div>
  );
};