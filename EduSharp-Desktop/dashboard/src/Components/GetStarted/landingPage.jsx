import React from 'react'
import './style.css'
import logo from '../images/image.png'
import {useNavigate} from 'react-router-dom'

const Landing = ()=>{
    const navigate = useNavigate()
    return(
        <div className='ContainerLanding'>
            <div className='head'>
                <div className='logo'>
                      <img src={logo} alt={'edusharp'} width={50} height={50}/>
                     <h3>EduSharp</h3>
                </div>
                    <h3>
                        Administration
                    </h3>
            </div>
            <div className='body'>
                <div>
                    <h2>
                        Online Basic Education Community for all learners in secondary school.
                    </h2>
                </div>
                    
                    <div className='sub'>
                         <div >
                        <p className='subtitle'>Creating an online basic education community, where learners can communicate with each other . </p>
                        <br/>
                          <button className='click' onClick={()=>navigate('/signUp')} > Get Started</button>
                    </div>
                    <div className='getStarted'>
                       
                    </div>
                    </div>
            </div>
        </div>
    )
}
export default Landing;