import React from 'react'
import './Styles.css'
import logo from '../images/image.png'
const Sidenav = ({sidebtns}) => {
  return (
    <div className="sideNavContainer">
    <div className="header">
      <img src={logo} alt={"edusharp"} width={50} height={50} />
      <p>EduSharp</p>
    </div>
    <div className="lessonLink">
        {
            sidebtns.map((btn)=>(
                <a href={btn.href}>
                    <p>{btn.text}</p>
                </a>
            ))
        }
    </div>
  </div>
  )
}

export default Sidenav