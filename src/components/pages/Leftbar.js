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
        <br />
        <MdOutlineHome className="icon" />
        <br />
        <BsChatDots className="icon" />
        <br />
        <FaRegBell className="icon" />
        <br />
        <MdOutlineSettings className="icon" />
        <br />
        <IoExitOutline className="icon" />
      </div>
    </div>
  )
}

export default Leftbar
