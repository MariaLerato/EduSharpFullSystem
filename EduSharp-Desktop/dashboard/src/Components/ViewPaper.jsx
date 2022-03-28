import React, { useState, useEffect } from 'react';
import logo from './images/image.png'
import books from "./images/books-book-pages-read-literature-159866.webp"
import Users from './Authentication-firebase/reuse'
import ViewCard from './ViewCard';
import Skeleton from '@mui/material/Skeleton';

export const ViewPaper = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true);

  const Loading = () => (
    <div
      style={{
        width: 330,
        height: 280,
        boxShadow: "2px 2px 2px rgba(0,0,0,.1)",
        borderRadius: 5,
        position: "relative",
        margin: 10
      }}
    >
      <Skeleton
        animation="wave"
        height={140}
        width="100%"
        variant="rectangular"
      />
      <Skeleton
        width="60%"
        height={40}
        style={{ marginLeft: 10, marginTop: 10 }}
      />
      <Skeleton width="55%" height={30} style={{ marginLeft: 10 }} />
      <div style={{ display: "flex" }}>
        <Skeleton width="25%" height={60} style={{ marginLeft: 10 }} />
        <Skeleton width="25%" height={60} style={{ marginLeft: 10 }} />
      </div>
    </div>
  );
  const ViewLessons = () => {
    Users.viewItems("question").then(async (data) => {
      if (data.status === "success") {
        setItems(data.data);
        setLoading(false)
      } else {
        console.log(data);
        setLoading(false)
      }
    });
  };
  useEffect(() => {
    ViewLessons()
  }, [])

  return <div className="Cont">
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
  
    <div className="cardholder">
            {
              loading?(<>
              <Loading/>
              <Loading/>
              <Loading/>
              <Loading/>
              <Loading/>
             
              </>):(
              items.length===0?(<>You have no posted any lessons</>):
              <>
              
                {items.map((data) => (
                  <ViewCard data={data} refresh={ViewLessons}/>
                ))}
              </>)
            }
        
        </div>
    </div>
  </div>;
}

export default ViewPaper;