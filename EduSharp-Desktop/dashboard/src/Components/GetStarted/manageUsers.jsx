import React,{useState,useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Users from '../Authentication-firebase/reuse'
import LinkNav from '../navigation/linkNav';
import Role from './role';
import Skeleton from '@mui/material/Skeleton';


const ManageUsers = () => {
  const [users,setItems] = useState([])
  const [loading, setLoading] = useState(true);
 
  const Loading = () => (
    <div
      style={{
      
        boxShadow: "2px 2px 2px rgba(0,0,0,.1)",
        borderRadius: 5,
        position: "relative",
        margin: 10
      }}
    >
    
      <div style={{ display: "grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr" }}>
        <Skeleton  variant='text' height={40} style={{ marginLeft: 10 }} />
        <Skeleton variant='text' height={40} style={{ marginLeft: 20 }} />
        <Skeleton variant='text' height={40} style={{ marginLeft: 20 }} />
        <Skeleton width="20%" height={40} style={{ marginLeft: 20 }} />
        <Skeleton width="40%" height={40} style={{ marginLeft: 20 }} />
        <Skeleton width="40%" height={40} style={{ marginLeft: 20 }} />
      </div>
    </div>
  );
  const ViewLessons = ()=>{ 
    Users.getUser("users").then(async(data) => {
      if (data.status === "success") {
        setItems(data.data);
        setLoading(false)
      } else {
        console.log(data);
        setLoading(false)
      }
 })
}
 useEffect(()=>{
   ViewLessons()
 },[])
 const deleteUser = (index)=>{
 {users.splice(index,1)}   
 console.log('jaghfgsyugfuyhasbhyuftggads')
}
    return (

    <div className='ContentContainer'>
        <LinkNav/>
    <div>
        <div className='banner'>
            <p>Name</p>
            <p>Email</p>
            <p>Phone Number</p>
         
            <p>Roles</p>
            <p>Manage</p>
        </div>
        <div>
        {
              loading?(<>
              <Loading/>
              <Loading/>
              <Loading/>
              <Loading/>
              <Loading/>
              <Loading/>
              <Loading/>
              <Loading/>
              </>):(
              users.length===0?(<>You have no Users</>):
              <>
               {users.map((data,index)=>
      
      <Role data={data} index={index} deleteUser={deleteUser}/>
      )}
              </>)
            }
        </div>
       
       
    </div>
    </div>
  )
}

export default ManageUsers