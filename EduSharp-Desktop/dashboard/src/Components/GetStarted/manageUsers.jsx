import React,{useState,useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Users from '../Authentication-firebase/reuse'
import LinkNav from '../navigation/linkNav';
import Role from './role';


const ManageUsers = () => {
  const [users,setItems] = useState([])
  const ViewLessons = ()=>{ 
    Users.getUser("users").then(({data})=>
    setItems(data)
    )
 }
 useEffect(()=>{
   ViewLessons()
 },[])
    return (

    <div className='ContentContainer'>
        <LinkNav/>
    <div>
        <div className='banner'>
            <p>Name</p>
            <p>Email</p>
            <p>Phone Number</p>
            <p>Joined Date</p>
            <p>Roles</p>
            <p>Manage</p>
        </div>
        {users.map(data=>
      
          <Role data={data}/>
          )}
       
    </div>
    </div>
  )
}

export default ManageUsers