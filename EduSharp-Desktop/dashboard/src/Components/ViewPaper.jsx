import React from 'react';
import logo from './images/image.png'
import books from "./images/books-book-pages-read-literature-159866.webp"

export const ViewPaper = () => {
  return<div className="Cont">
  <div className="sidenav">
    <div className="header">
      <img src={logo} alt={"edusharp"} width={50} height={50} />
      <p>EduSharp</p>
    </div>
    <div className="lessonLink">
     <a href="/AddQuestion" >
        <p>Add Question Paper</p>
       </a> 
       <a href="/ViewPaper">
         <p>View Question Paper</p>
       </a>
    
    </div>
 
  </div>
  <div className='contentContainer'>
    <div >
      <i className='fa fa-search fa-2x'/> 
     <input type={'search'} placeholder={'Search Question Papers ..'} className={'search'}/>
      <div class="card" style={{width: "18rem"}}>
  <img src={books} class="card-img-top" alt="..."/>
  <div class="card-body">
    <p class="card-text">
     Subject
     <p>Topic</p>
     <p>Grade</p>
      </p>
    
  </div>
</div>
    </div>
  </div>
  </div>;
}

export  default ViewPaper;