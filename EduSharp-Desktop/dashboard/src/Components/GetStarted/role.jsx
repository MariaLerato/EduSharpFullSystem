import React,{useState} from 'react'

const Role = ({data}) => {
    const [role,setRole] = useState()

  return (
    <div>
          <div className='listUsers'>
            <p>
            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                {data.name}</p>
            <p>{data.email}</p>
            <p>{data.location}</p>
            <p>20 min ago</p>
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
        </div>
    </div>
  )
}

export default Role