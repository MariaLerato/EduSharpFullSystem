import React from "react";
import Manageusersgrid from "./Manageusersgrid";
import "./Styles.css";

const cols = [
  { id: 1, field: "name", width: 200 },
  { id: 2, field: "Email", width: 220 },
  { id: 3, field: "Joined", width: 250 },
  { id: 4, field: "Last Seen", width: 150 },
  { id: 1, field: "Role", width: 190 }
];
const data=[{id:1,name:'Melva Makweya',email:'melnkama2@gmail.com',joined:'May 28 2021 at 16:00',lastseen:'Nov 2 at 12:00',role:'admin'}]

const Manageusers = () => {
  return (
    <div className="maincontent">
      <Manageusersgrid colums={cols} data={data}/>
    </div>
  );
};

export default Manageusers;
