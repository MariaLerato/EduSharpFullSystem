import React, { useState } from "react";

import logo from "./images/image.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import {useNavigate} from 'react-router-dom'
import Users from './Authentication-firebase/reuse'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddLesson = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState();
  const [grade, setGrade] = useState();
  const [topic, setTop] = useState();
  const [file, setFile] = useState();
  const [description, setDescription] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [ee,setee]=useState()

  const filesetter=(e)=>{
    setFile(e.target.files[0])
    setee(e)
  }


  const onSubmit = (e) => {
    e.preventDefault();
    console.log("waiting");
    setOpen(true);
    Users.addItem(
      subject,
      grade,
      description,
      topic,
      file,
      file.name,
      "book"
    )
      .then((res) => {
        if(res.status==='Success'){
          setMessage(res.message)
          setOpen(false);
          setTop("");
          setDescription("");
          setSubject("");
          setGrade("");
          setOpenSnackbar(true)
          console.log("added", res);
        }else{
          setMessage(res.message)
          setIsError(true)
        }
      })
      .catch((error) => {
        console.log("some error happened", error);
      });
  };

  return (
    <div className="Cont">
      <div className="sidenav">
        <div className="header">
          <img src={logo} alt={"edusharp"} width={50} height={50} />
          <p>EduSharp</p>
        </div>
        <div className="lessonLink">
          <a href="/AddBook">
            <p>Add Book</p>
          </a>
          <a href="/ViewBooks">
            <p>View Books</p>
          </a>
        </div>
      </div>
      <div className="app">
        <h3>Add New Book</h3>
        {/* <div className="form"> */}
        {/* <h4  style={{marginLeft:'2%'}}>Edit Lesson</h4> */}
        <form className="form" onSubmit={onSubmit}>
          <div className="select">
            <label>Subject</label>
            <select
              class="form-select"
              aria-label="Default select example"
              style={{ width: 600 }}
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}
            >
              <option selected>Select Subjects</option>
              <option value="Physical Science">Physical Science</option>
              <option value="Life Science">Life Science</option>
              <option value="Consumer Studies">Consumer Studies</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Business Studies">Business Studies</option>
              <option value="Economics">Economics</option>
              <option value="Accounting">Accounting</option>
              <option value="Geography">Geography</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Sepedi">Sepedi</option>
              <option value="English">English</option>
              <option value="Life Orientation">Life Orientation</option>
              <option value="Technical Science">Technical Science</option>
            </select>
          </div>
          <br />
          <div className="select">
            <label>Grades</label>
            <select
              class="form-select"
              aria-label="Default select example"
              style={{ width: 600 }}
              value={grade}
              onChange={(e)=>setGrade(e.target.value)}

            >
              <option selected>Select Grade</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
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
              onChange={(e)=>setTop(e.target.value)}

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
              onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
          </div>
          <label className="upload">Upload Book</label>
          <div class="input-group mb-3">
            <input
              type="file"
              class="form-control"
              id="inputGroupFile03"
              aria-describedby="inputGroupFileAddon03"
              aria-label="Upload"
              onChange={(e)=>setFile(e.target.files[0])}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={`${!isError ? "success" : "error"}`}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default AddLesson;
