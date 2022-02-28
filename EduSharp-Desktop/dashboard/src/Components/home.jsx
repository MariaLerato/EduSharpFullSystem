import React,{useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { Sidemenu } from "./sidemenu";

export const Home = () => {
  const navigate = useNavigate()
 

  return (
    <div className="home-container">
       <div class="section group">
        <div class="col span_1_of_2"></div>
        <div class="col span_1_of_2"></div>
      </div>
      <div className="menu">
        <Sidemenu />
      </div>
      <div className="data">
        <div className="heading">
          <div className="search">
            <i className="fa fa-search"></i>
            <input type={"text"} placeholder="   Find" />
          </div>
          <div className="username">
            <p>Hi,Username</p>
            <i className="fa fa-user-circle fa-2x"></i>
            <div className="icon">
            <i className="fa fa-bell"></i>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="text-head">
            <h1 style={{color:'white'}}>Welcome to our EduSharp Admin System</h1>
          </div>
          <div className="cards">
            <div className="questions">
              <div className="question">
                <h3>Question Papers</h3>
          <Link to={'/AddQuestion'}>
             <i className="fa fa-edit fa-3x"></i>
           </Link>       
              </div>
              <div className="lesson">
                <h3>Lessons</h3>
                <Link to={'/AddLesson'}>
                    <i class="fa fa-calendar fa-3x"></i>
                </Link>
              </div>
            </div>
            <div className="offered">
              <div className="books">
                <h3>Books</h3>
                <Link to={'/AddBook'}>
                   <i className="fa fa-list-alt fa-3x"></i>
                </Link>
              </div>
              <div className="material">
                <h3>Material</h3>
                <i className="fa fa-copy fa-3x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
