import React,{useState} from 'react'
import './style.css'
import logo from '../images/image.png'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
    const [firstname,setName] = useState()
    const [lastname,setLastName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()
  return (
  
  <div className='ContainerRegister'>
        <div className='backBody'>
             <div className='head'>
                <div className='logo'>
                      <img src={logo} alt={'edusharp'} width={50} height={50}/>
                <h3 color='white'>EduSharp</h3>
                </div>
                    <h3>Administration
                        </h3>
            </div>
            <div className='signBody' style={{marginTop:'2%'}}>
                <div className='headings'>
                <h1>
                    Sign In To account.
                </h1>
                <p>Don't have an account? <a href='signUp'>Register Account</a></p>   
                </div>
  
                <form className='Register'>
                    <div>
                    
                    </div>
                    {/* other inputs */}
                    <div className='input-icons'>
                   {/* <i className='fa fa-envelope fa-2x'></i> */}
                    <input type='email' placeholder='Email Address'
                    className='input-field' value={email} onChange={(e)=>setEmail(e.target.value)} 
                    />
                   </div>
                   <div className='input-icons'>
                   {/* <i className='fa fa-eye fa-2x'></i> */}
                    <input type='password' placeholder='Enter Password'
                    className='input-field' value={password} onChange={(e)=>setPassword(e.target.value)} 
                    />
                   </div>
                   <div className='buttons'>
                       <button className='forgotButton'>Forgot Password</button>
                       <button className='logButton' onClick={()=>navigate('/home')}>Log In To Account</button>
                   </div>
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default LogIn