import React,{useState,useEffect} from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import './Styles.css'

const SidenavBtn = ({icon,title,path,current}) => {
    const[isActive,seIsActive]=useState(false)
    const navigate=useNavigate()
    const goToPath=()=>{
        navigate(path)
    }
    const location=useLocation()
    const sitePath=location.pathname
  
    console.log(location.pathname,'<<<<<<<<<<<<<<',isActive)
  return (
    <div className={`sidebtn ${sitePath.includes(current)?'active':'inactive'} `} onClick={()=>goToPath()}>
        <i className={icon}></i>
        
        <h4 >
        {title}
        </h4>
    </div>
  )
}

export default SidenavBtn