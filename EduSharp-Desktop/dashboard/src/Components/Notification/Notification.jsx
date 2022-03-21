import React,{useState,useEffect} from 'react'
import './Styles.css'
import Notificationcard from './Notificationcard'
import LinkNav from "../navigation/linkNav";
import Skeleton from '@mui/material/Skeleton';
import Users from '../Authentication-firebase/reuse'

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [items,setItems] = useState([])

  const Loading = () => (
    <div
      style={{
        boxShadow: "2px 2px 2px rgba(0,0,0,.1)",
        borderRadius: 5,
        position: "relative",
        margin: 10
      }}
    >
      
      <div style={{display:'flex'}}>
      <Skeleton
        animation="wave"
        height={80}
        width={80}
        variant="circular"
      /> 
         <Skeleton  height={30} variant='text' style={{ marginLeft: 10 }} />
      </div>
      
      <Skeleton  height={30} variant='text' style={{ marginLeft: 10 }} />
      <div style={{ display: "flex" }}>
        <Skeleton width="25%" height={70} style={{ marginLeft: 10 }} />
        <Skeleton width="25%" height={70} style={{ marginLeft: 10 }} />
      </div>
    </div>
  );
  const ViewLessons = () => {
    Users.viewItems("book").then(async (data) => {
      if (data.status === "success") {
        setItems(data.data);
        setLoading(false)
      } else {
        console.log(data);
        setLoading(false)
      }
    });
  };
 useEffect(()=>{
   ViewLessons()
 },[])
  return (
    <div>
        <div>
          <LinkNav />
        </div>
      <div className='maincontent notification'>
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
        <Notificationcard />
      </div>
    </div>

  )
}

export default Notification