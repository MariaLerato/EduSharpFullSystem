import React,{useState} from 'react'

const Role = ({data,index,deleteUser}) => {
    const [role,setRole] = useState()
console.log(index,'======++++++++')
  return (
    <div >
          <div className='listUsers'>
            <p>
            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                {data.name}</p>
            <p>{data.email}</p>
            <p>{data.phonenumber}</p>
        
            <select
              class="form-select"
              aria-label="Default select example"
              style={{ width: "50%" }}
              value={role}
              onChange={(e)=>setRole(e.target.value)}
            >
              <option selected>Manage Role</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
            <div className='deleteIcon' style={{cursor:'pointer',fontWeight:'700'}} onClick={()=>deleteUser(index)}>
            <i class="fa fa-trash " >delete User</i>
            </div>
        </div>
    </div>
  )
}

export default Role