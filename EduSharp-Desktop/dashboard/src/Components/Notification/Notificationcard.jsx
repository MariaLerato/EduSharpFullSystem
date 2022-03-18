import React from "react";
import Avatar from "@mui/material/Avatar";
import './Styles.css'
const Notificationcard = () => {



    const Message=({filename,icon})=>(
    
        <div className="iconandname">
                    <i class={icon} aria-hidden="true"></i>
                    <p>{filename}</p>
              </div>
        
    )


  return (
    <div className="NotifCard">
      <div className="notifimageconatainer">
        <Avatar
          alt="Remy Sharp"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          sx={{ width: 65, height: 65 }}
        />
      </div>
      <div className="Notifcontainer">
          <div className="names">
              <h3> Melva Makweya</h3>
              <p className="time">3 minutes ago</p>
          </div>
          <div className="message">
              <h4>Added 2 files to <span>Lessons</span></h4>
          </div>
          <div className="detailsNotifContainer">
              <Message icon="fa fa-television" filename="video.mp4"/>
              <Message icon="fa fa-book" filename="book.pdf"/>
              <Message icon="fa fa-television" filename="video.mp4"/>
          </div>
      </div>
    </div>
  );
};

export default Notificationcard;
