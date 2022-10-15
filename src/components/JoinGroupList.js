import React from "react"
import { Button } from "@mui/material"
import { BiMessageAltDetail } from "react-icons/bi"

const JoinGroupList = () => {
  return (
    <div className="grouplist joingroup">
      <h2>Group List</h2>

      <>
        <div className="box">
          <div className="img">
            <img src="assets/images/group.jpg" alt="" />
          </div>
          <div className="name">
            <h4>3434</h4>
            <h5>asdgsdgds</h5>
          </div>
          <div className="button">
            <button>
              <BiMessageAltDetail />
            </button>
          </div>
        </div>
        <div className="divider"></div>
      </>
    </div>
  )
}

export default JoinGroupList
