import React from "react"
import { Button } from "@mui/material"

const MyGroup = () => {
  return (
    <div className="grouplist friendlist mygroup">
      <h2>My Group</h2>

      <div className="box">
        <div className="img">
          <img src="./assets/images/group.jpg" alt="" />
        </div>
        <div className="name">
          <h4>MERN</h4>

          <h5>The best fishing Group</h5>
        </div>
        <div className="button">
          <div className="info">
            <p>3/6//2022</p>
            <button variant="contained">Info</button>
          </div>
        </div>
      </div>

      <div className="divider"></div>
    </div>
  )
}

export default MyGroup
