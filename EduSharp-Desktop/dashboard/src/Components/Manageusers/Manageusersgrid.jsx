import React, { useState } from "react";
import "./Styles.css";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const Manageusersgrid = ({ colums, data }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <div className="cols">
        {colums.map((cols) => (
          <div style={{ width: cols.width, marginLeft: 5, marginRight: 5 }}>
            <h3>{cols.field}</h3>
          </div>
        ))}
      </div>
      <div className="rows">
        {data.map((user, index) => (
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <div>
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </div>
            <div
              style={{
                width: colums[0].width,
                marginLeft: 5,
                marginRight: 5
              }}
            >
              <h3> {user.name}</h3>
            </div>
            <div
              style={{
                width: colums[1].width,
                marginLeft: 5,
                marginRight: 5
              }}
            >
              <h3> {user.email}</h3>
            </div>
            <div
              style={{
                width: colums[2].width,
                marginLeft: 5,
                marginRight: 5
              }}
            >
              <h3> {user.joined}</h3>
            </div>
            <div
              style={{
                width: colums[3].width,
                marginLeft: 5,
                marginRight: 5
              }}
            >
              <h3> {user.lastseen}</h3>
            </div>
            <div
              style={{
                width: colums[4].width,
                marginLeft: 5,
                marginRight: 5
              }}
            >
              <InputLabel id="demo-simple-select-label">{user.role}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user.role}
                label={user.role}
                sx={{ width: colums[4].width,height:40}}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Admin</MenuItem>
                <MenuItem value={20}>Student</MenuItem>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manageusersgrid;
