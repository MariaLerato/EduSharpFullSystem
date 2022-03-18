import React,{useState} from 'react';
import './AddLesson.css'
import logo from './images/image.png'
import styled from "styled-components";
import Image from './images/video.png'
import reuse from './Authentication-firebase/reuse';

export const AddLesson = () => {
  console.log(reuse.addItem(),'-=-=-=-=-==-')
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

<<<<<<< Updated upstream
  const HandleTap=(type)=>{
    setActive(type)
    setIndex(type)
=======
  
  const onSubmit = (e)=>{
    e.preventDefault()
  
  const t= Users.addItem(subject,grade,description,topic,file,file.name,'lessons')
  console.log(t)
>>>>>>> Stashed changes
  }

  return <div>
    <div className="username2">
            <p>Hi,Username</p>
            <i className="fa fa-user-circle fa-2x"></i>
            <div className="icon">
            <i className="fa fa-bell"></i>
            </div> 
          </div>
<table>
  <tr>
    {/* <td className="menu2">
    <div >
    <div className='head-container2'>
          <img src={logo} alt ='' className='picture' ></img>
          <h2>EduSharp</h2>
      </div>
      <div className='screens'>
        <div className='active'>  <i className='fa fa-home '></i> Home<br/><br/></div><br/>
          <i className='fa fa-bell '></i>Notifications<br/><br/>
          <i class="fa fa-exclamation-circle "></i> Complaints<br/><br/>
          <i className='fa fa-user '></i>   Profile<br/><br/>
          <i className='fa fa-users '></i>Manage Users<br/>
      </div>
      </div>
    </td> */}
    <td className='MyData'>

<<<<<<< Updated upstream
    <div >
    <h1>Lessons</h1>
    <div className='grey'>
     <div className='Menu'>
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
     {
       index ==="Add"?(
        <div className='Info'>
        <table>
          <tr className='row'>
            <td className='First'>Subject </td>
            <td><select className='select'></select></td>
          </tr>
          <tr className='row'>
            <td className='First' > Grade </td>
            <td><select className='select'></select></td>
          </tr>
          <tr className='row'>
            <td className='First'> Description</td>
            <td><select className='select'></select></td>
          </tr >
          <tr className='row'>
            <td className='First'>Subject </td>
            <td><select className='select'></select></td>
          </tr>
          <tr className='row'>
            <td className='First' > Date </td>
            <td><select className='select'></select></td>
          </tr>
          <tr className='row'>
            <td className='First'>Upload Video </td>
            <td><input className='file' type='file'></input></td>
          </tr>
          <tr className='row'>
            <td> </td>
            <td><button type='button' className='Btn'> Save</button></td>
          </tr>
        </table>
        </div>
       ):(<div className='Info'>
=======
  //How to get viewlessons
  // 
>>>>>>> Stashed changes

         <div className='rows'>
         <div className='subject'>
           <h3>Physical Science</h3>
             <li>LeahMlab</li>
             <li>Grade 10</li>
             <br/>
           <img src={Image} alt ='' className='' ></img>
           <br/>
           <button className='btnView' > View more </button>
       </div>

<<<<<<< Updated upstream
         <div className='subject'>
           <h3>Physical Science</h3>
             <li>LeahMlab</li>
             <li>Grade 10</li>
             <br/>
           <img src={Image} alt ='' className='' ></img>
           <br/>
           <button className='btnView' > View more </button>



         </div>
           </div>
        
         

       </div>)
     }

   </div>
     </div>
    </td>
  </tr>
</table>


  </div>;
=======
  return (
    <div className="Cont">
      <Sidenav sidebtns={btns}/>
      {/* <div className="sidenav">
        <div className="header">
          <img src={logo} alt={"edusharp"} width={50} height={50} />
          <p>EduSharp</p>
        </div>
        <div className="lessonLink">
          <a href="/AddLesson">
            <p>Add Lesson</p>
          </a>
          <a href="/ViewLessons">
            <p>View Lessons</p>
          </a>
        </div>
      </div> */}
      <div className="app">
        <h3>Add Lessons</h3>
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
              style={{ width: "50%" }}
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
          <label className="upload">Upload Lesson</label>
          <div class="input-group mb-3">
            <input
              type="file"
              class="form-control"
              id="inputGroupFile03"
              aria-describedby="inputGroupFileAddon03"
              aria-label="Upload"
              placeholder="Add Lesson file"
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
    </div>
  );
>>>>>>> Stashed changes
};
