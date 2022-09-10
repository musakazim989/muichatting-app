import React from "react"

import { MdOutlineHome, MdOutlineSettings } from "react-icons/md"
import { BsChatDots } from "react-icons/bs"
import { FaRegBell } from "react-icons/fa"
import { IoExitOutline } from "react-icons/io5"

const Leftbar = () => {
  return (
    <div className="leftbar">
      <img className="profilepic" src="./assets/images/profile.jpg" alt="" />

      <div className="icons">
        <ul>
          <li className="active">
            <MdOutlineHome className="icon " />
          </li>
          <li>
            <BsChatDots className="icon" />
          </li>
          <li>
            <FaRegBell className="icon" />
          </li>
          <li>
            <MdOutlineSettings className="icon" />
          </li>
          <li>
            <IoExitOutline className="icon" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Leftbar
