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
    <div>
        <div className='manageHeader'>
            <h3>Manage Users</h3>
            <div className='iconsActive'>
            <i className='fa fa-search fa'/> 
     <input type={'search'} placeholder={'Search Lessons ..'} className={'searchIcon'}/>

            </div>
        </div>
        <div className='banner'>
            <p>Name</p>
            <p>Email</p>
            <p>Joined</p>
            <p>Last Seen</p>
            <p>Roles</p>
        </div>
        <div className='listUsers'>
            <p>
            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                Maria Fenyane</p>
            <p>fenyane02@gmail.com</p>
            <p>02/Feb/2022</p>
            <p>20 min ago</p>
            <div class="dropdown">
           
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Admin
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>

</div>
     
        
        </div>
    </div>
    </div>
  )
}

export default ManageUsers