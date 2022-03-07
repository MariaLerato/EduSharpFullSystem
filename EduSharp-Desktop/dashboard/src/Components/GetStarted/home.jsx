import React, { useState, useEffect } from 'react'
import logo from '../images/image.png'
import Users from '../reuse'

const HomePage = () => {
    const [firstname, setName] = useState()

    useEffect(() => {
        let uid = localStorage.getItem('userid')
        Users.getLoggedData(uid).on('value', action => {
            const data = action.val()
            setName(data.firstname)
        })
    })
    return (
        <div className='ContentContainer'>
            <div className='headBar'>
                <div className='Bar'>
                    <div className='logoBar'>
                        <img src={logo} alt={'edusharp'} width={50} height={50} />
                        <h2>EduSharp</h2>
                        {/* <h1>Welcome!{firstname}</h1> */}
                    </div>
                    <div className='navBar'>
                        <ul>
                            <li>
                                <a>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a>Notifications</a>
                            </li>
                            <li>
                                <a>Complaints</a>
                            </li>
                            <li>
                                <a>Profile</a>
                            </li>
                            <li>
                                <a>
                                    Manage Users
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className='bodyContent'>
                <h2>
                    Organise, Add, Delete, Update and <br/>manage the following  materials found on the client side
                </h2>
                <div className="CardResourses">

                    <div className="questionCard">
                        <h3>Question Papers</h3>
                        <i className="fa fa-edit fa-3x"></i>
                    </div>
                    <div className="lessonCard">
                        <h3>Lessons</h3>
                        <i class="fa fa-calendar fa-3x"></i>
                    </div>
                    <div className="booksCard">
                        <h3>Books</h3>

                        <i className="fa fa-list-alt fa-3x"></i>

                    </div>
                   
                </div>
                
            </div>

        </div>
    )
}

export default HomePage