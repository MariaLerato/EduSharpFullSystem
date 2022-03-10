import React, { useState } from "react";
import "./AddLesson.css";
import logo from "./images/image.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "./images/video.png";
import {useNavigate} from 'react-router-dom'
import Users from './Authentication-firebase/reuse'

const AddQuestion = () => {

  const [subject,setSubject] = useState()
  const [grade,setGrade] =useState()
  const [topic,setTop] = useState()
  const [file,setFile] = useState()
  const [description,setDescription ] = useState()

  const onSubmit = ()=>{
    Users.addItem(subject,grade,description,topic,file,'question')
  }
  const navigate = useNavigate()
  return (
    <div className="Cont">
      <div className="sidenav">
        <div className="header">
          <img src={logo} alt={"edusharp"} width={50} height={50} />
          <p>EduSharp</p>
        </div>
        <div className="lessonLink">
          <a href="/AddQuestion">
            <p>Add Question Paper</p>
          </a>
          <a href="/ViewPaper">
            <p>View Question Paper</p>
          </a>
        </div>
      </div>
      <div className="app">
        <h3>Add Question Paper</h3>
        {/* <div className="form"> */}
        {/* <h4  style={{marginLeft:'2%'}}>Edit Lesson</h4> */}
        <form className="form" onSubmit={onSubmit}>
          <div className="select">
            <label>Subject</label>
            <select
              class="form-select"
              aria-label="Default select example"
              style={{ width: "50%" }}
              value={subject}
              onChange={(t)=>setSubject(t)}
            >
              <option selected>Select Subjects</option>
              <option value="1">Physical Science</option>
              <option value="2">Life Science</option>
              <option value="3">Consumer Studies</option>
              <option value="4">Mathematics</option>
              <option value="5">Business Studies</option>
              <option value="6">Economics</option>
              <option value="7">Accounting</option>
              <option value="8">Geography</option>
              <option value="9">Agriculture</option>
              <option value="10">Sepedi</option>
              <option value="11">English</option>
              <option value="12">Life Orientation</option>
              <option value="13">Technical Science</option>
            </select>
          </div>
          <br />
          <div className="select">
            <label>Grades</label>
            <select
              class="form-select"
              aria-label="Default select example"
              style={{ width: "50%" }}
              value={grade}
              onChange={(t)=>setGrade(t)}
            >
              <option selected>Select Grade</option>
              <option value="1">08</option>
              <option value="2">09</option>
              <option value="3">10</option>
              <option value="3">11</option>
              <option value="3">12</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
            Topic
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Lesson Topic"
              value={topic}
              onChange={(t)=>setTop(t)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Description
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={description}
              onChange={(t)=>setDescription(t)}
            ></textarea>
          </div>
          <label className="upload">Upload Question Paper</label>
          <div class="input-group mb-3">
            <input
              type="file"
              class="form-control"
              id="inputGroupFile03"
              aria-describedby="inputGroupFileAddon03"
              aria-label="Upload"
              value={file}
              // onChange={()}
            />
          </div>
          <button type="submit" className="button">
            Save
          </button>
          <button type="submit" className="button" onClick={()=>navigate('/home')} id="back">
            Go Back
          </button>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
};
export default AddQuestion;
