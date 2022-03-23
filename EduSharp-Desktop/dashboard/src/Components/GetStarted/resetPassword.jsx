import React,{useState} from 'react'
import './style.css'
import logo from '../images/image.png'
import { useNavigate } from 'react-router-dom'
import Users from '../Authentication-firebase/reuse'


const ResetPassword = () => {
   
    const [email,setEmail] = useState()
  
    const navigate = useNavigate()

    const SignIn = (e)=>{
        e.preventDefault()
        Users.resetPassword(email,navigate)
        console.log('reset password')
    }
    return (
  
  <div className='ContainerRegister'>
        <div className='backBody'>
             <div className='head'>
                <div className='logo'>
                      <img src={logo} alt={'edusharp'} width={50} height={50}/>
                <h3 >EduSharp</h3>
                </div>
                    <h3>Administration
                        </h3>
            </div>
            <div className='signBody' style={{marginTop:'15%'}}>
                <div className='headings' >
                <h1>
                    Reset Your Password
                    </h1>
             </div>
  
                <form className='Register' onSubmit={SignIn} style={{marginTop:'-2%'}} >
                    <div>
                    </div>
                    {/* other inputs */}
                    <div className='input-icons'>
                   {/* <i className='fa fa-envelope fa-2x'></i> */}
                    <input type='email' placeholder='Email Address'
                    className='input-field' value={email} onChange={(e)=>setEmail(e.target.value)} 
                    />
                   </div>
               
                   <div className='buttons'>
                       
                       <button className='logButton' style={{marginTop:'1%',}} onClick={SignIn}  type={'submit'}>Reset Your Password</button>
                   </div>
                   <p>Remember Your Password? <a href='signIn'>Sign In</a></p>   
              
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default ResetPassword