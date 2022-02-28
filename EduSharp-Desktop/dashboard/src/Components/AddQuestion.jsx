// import React from 'react';

// export const AddQuestion = () => {
//   return <div>
//         <h1>Add Question Paper Page </h1>
//   </div>;
// };
import React, { useState } from "react";
import "./AddQuestion.css";
import logo from "./images/image.png";
import styled from "styled-components";

export const AddQuestion = () => {
  const Tab = styled.button`
    font-size: 20px;
    padding: 10px 60px;
    cursor: pointer;
    opacity: 0.6;
    background: white;
    border: 0;
    outline: 0;
    ${({ active }) =>
      active &&
      `
 border:2px solid #A1A1A1;
 border-bottom:none
 opacity:1;
 color:#4B7BE8;
 font-weight:600
  `}
  `;
  const ButtonGroup = styled.div`
   display:flex;
  `
  const headers = ["Add", "View"];
  const [active, setActive] = useState(headers[0]);
  const [index,setIndex]=useState("Add")

  const HandleTap=(type)=>{
    setActive(type)
    setIndex(type)
  }

  return (
    <div>
      <div className="username2">
        <p>Hi,Username</p>
        <i className="fa fa-user-circle fa-2x"></i>
        <div className="icon">
          <i className="fa fa-bell"></i>
        </div>
      </div>
      <table>
        <tr>
          <td className="menu2">
            <div>
              <div className="head-container2">
                <img src={logo} alt ='' className="picture"></img>
                <h2>EduSharp</h2>
              </div>
              <div className="screens">
                <div className="active">
                  {" "}
                  <i className="fa fa-home "></i> Home
                  <br />
                  <br />
                </div>
                <br />
                <i className="fa fa-bell "></i>Notifications
                <br />
                <br />
                <i class="fa fa-exclamation-circle "></i> Complaints
                <br />
                <br />
                <i className="fa fa-user "></i> Profile
                <br />
                <br />
                <i className="fa fa-users "></i>Manage Users
                <br />
              </div>
            </div>
          </td>
          <td className="MyData">
            <div>
              <h1>Question Paper</h1>
              <div className="grey">
                <div className="Menu">
                  <ButtonGroup>
                    {
                      headers.map(type=> (
                        <Tab key={type}
                        active={active === type}
                        onClick={()=>HandleTap(type)}
                        >
                          {type}
                        </Tab>
                      ))
                    }
                  </ButtonGroup>
                  </div>
                  {/* <Tabs headers={headers} style={{ color: "red" }}>

                    <Tab> */}
                    {
                      index==="Add"?(<div className="Info">
                      <table>
                        <tr className="row">
                          <td className="First">Subject </td>
                          <td>
                            <select className="select"></select>
                          </td>
                        </tr>
                        <tr className="row">
                          <td className="First"> Grade </td>
                          <td>
                            <select className="select"></select>
                          </td>
                        </tr>
                        <tr className="row">
                          <td className="First"> Description</td>
                          <td>
                            <select className="select"></select>
                          </td>
                        </tr>
                        <tr className="row">
                          <td className="First">Subject </td>
                          <td>
                            <select className="select"></select>
                          </td>
                        </tr>
                        <tr className="row">
                          <td className="First"> Date </td>
                          <td>
                            <select className="select"></select>
                          </td>
                        </tr>
                        <tr className="row">
                          <td className="First">Upload Video </td>
                          <td>
                            <input className="file" type="file"></input>
                          </td>
                        </tr>
                        <tr className="row">
                          <td> </td>
                          <td>
                            <button type="button" className="Btn">
                              {" "}
                              Save
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>):(<div className="Info"></div>)
                    }
                      
                    {/* </Tab>
                  </Tabs> */}
                
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};
