import React from "react"
import { Divider, Button } from "@mui/material"

const GroupList = () => {
  return (
    <div className="grouplist">
      <h2>
        Group List
        <div className="buton">
          <Button variant="contained">Create group</Button>
        </div>
      </h2>
      <div className="box">
        <div className="img">
          <img src="./assets/images/group.jpg" alt="" />
        </div>
        <div className="name">
          <h4>Fishing 2020</h4>
          <h5>The best fishing gourp in Urla</h5>
        </div>
        <div className="button">
          <button>Join</button>
        </div>
      </div>

      <div className="divider"></div>

      <div className="box">
        <div className="img">
          <img src="./assets/images/group.jpg" alt="" />
        </div>
        <div className="name">
          <h4>Fishing 2020</h4>
          <h5>The best fishing gourp in Urla</h5>
        </div>
        <div className="button">
          <button>Accept</button>
        </div>
      </div>
      <div className="divider"></div>

      <div className="box">
        <div className="img">
          <img src="./assets/images/group.jpg" alt="" />
        </div>
        <div className="name">
          <h4>Fishing 2020</h4>
          <h5>The best fishing gourp in Urla</h5>
        </div>
        <div className="button">
          <button>Accept</button>
        </div>
      </div>
      <div className="divider"></div>

      <div className="box">
        <div className="img">
          <img src="./assets/images/group.jpg" alt="" />
        </div>
        <div className="name">
          <h4>Fishing 2020</h4>
          <h5>The best fishing gourp in Urla</h5>
        </div>
        <div className="button">
          <button>Accept</button>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  )
}

export default GroupList
