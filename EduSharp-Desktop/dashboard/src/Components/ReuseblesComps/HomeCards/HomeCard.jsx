import React from 'react'
import Card from '@mui/material/Card';

import './Styles.css'
import { useNavigate } from 'react-router-dom';

const HomeCard = ({path,icon,title}) => {
    const navigate=useNavigate()
    const handleClick=(e)=>{
        e.preventDefault()
        console.log('clicked')
        const slash=path.charAt(0)
        if(slash!=='/'){
            navigate(`/${path}`)
        }else{

            navigate(path)
        }
    }
  return (
    <div className='card' onClick={(e)=>handleClick(e)}>
         <h3>{title}</h3>
         <i class={icon}></i>
    </div>
  )
}

export default HomeCard