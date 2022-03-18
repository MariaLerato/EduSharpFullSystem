import React, { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
const Complaints = () => {
  const [pending, setPending] = useState(0);
  const [closed, setClosed] = useState(0);
  const columns = [
    { field: "caseno", headerName: "case No.", width: 90 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "message", headerName: "Message", width: 290 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 120 }
  ];

  const rows = [
    {
      id: 1,
      caseno: 1,
      username: "Nkama",
      message: "cant access the question paper page",
      status: "pending",
      date: "5 january 2021"
    },
    {
      id: 2,
      caseno: 2,
      username: "Mari",
      message: "cant access comment",
      status: "pending",
      date: "25 january 2021"
    },
    {
      id: 3,
      caseno: 3,
      username: "Bella",
      message: "cant post",
      status: "closed",
      date: "5 may 2021"
    },
    {
      id: 4,
      caseno: 4,
      username: "leah",
      message: "cant post",
      status: "closed",
      date: "5 may 2021"
    },
    {
      id: 5,
      caseno: 5,
      username: "elizabth",
      message: "cant post",
      status: "closed",
      date: "5 may 2021"
    },
    {
      id: 6,
      caseno: 6,
      username: "andries",
      message: "cant post",
      status: "closed",
      date: "5 may 2021"
    },
    {
      id: 7,
      caseno: 7,
      username: "terrence",
      message: "cant post",
      status: "pending",
      date: "5 may 2021"
    }
  ];
  useEffect(()=>{
      const getData=()=>{
        const r=rows.filter(data=>data.status==='pending')

        const penNum=r.length;
        const closedNum=rows.length-penNum
        setPending(penNum)
        setClosed(closedNum)
      }
      getData()
  },[])
  return (
    <div className="maincontent">
      {/* header  */}
      <h2>
        closed <span>{closed}</span> pending <span>{pending}</span>
      </h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default Complaints;
