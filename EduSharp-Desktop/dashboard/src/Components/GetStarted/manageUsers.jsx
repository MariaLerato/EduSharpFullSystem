import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Users from '../Authentication-firebase/reuse'
import LinkNav from '../navigation/linkNav';


const ManageUsers = () => {
    const LogOut = ()=>{
        Users.signOut(navigate)
          }
    return (
        
    <div className='ContentContainer'>
        <LinkNav/>
    <i className='fa fa-search fa-2x'/> 
     <input type={'search'} placeholder={'Search Lessons ..'} className={'search'}/>
    
    <div>
        <div className='banner'>
            <p>Name</p>
            <p>Email</p>
            <p>Joined</p>
            <p>Last Seen</p>
            <p>Roles</p>
        </div>
        <div className='listUsers'>
        <div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>
        </div>
    </div>
    </div>
  )
}

export default ManageUsers