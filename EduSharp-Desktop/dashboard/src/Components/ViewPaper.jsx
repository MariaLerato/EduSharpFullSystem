import React,{useState,useEffect} from 'react';
import logo from './images/image.png'
import books from "./images/books-book-pages-read-literature-159866.webp"
import Users from './Authentication-firebase/reuse'

export const ViewPaper = () => {
  const [items,setItems] = useState([])
   
  const ViewLessons = ()=>{ 
    Users.viewItems('question').then(({data})=>
    setItems(data)
    )
 }
 useEffect(()=>{
   ViewLessons()
 },[])
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
     {items.map(data=>
          <div class="card" style={{width: "18rem"}}>
  <img src={books} class="card-img-top" alt="..."/>
  <div class="card-body">
    <p class="card-text">
  Subject:   {data.subject}
     <p>Topic: {data.topic}</p>
     <p>Grade: {data.grade}</p>
      </p>
    
  </div>
</div>
    
    )}
    </div>
  </div>
  </div>;
}

export  default ViewPaper;