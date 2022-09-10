import React, { useEffect, useState } from "react"
import { MdOutlineHome, MdOutlineSettings } from "react-icons/md"
import { BsChatDots } from "react-icons/bs"
import { FaRegBell } from "react-icons/fa"
import { IoExitOutline } from "react-icons/io5"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const Leftbar = (props) => {
  const auth = getAuth()
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName)
      } else {
        console.log("no user")
        navigate("/login")
      }
    })
  }, [])

  let handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login")
      })
      .catch((error) => {
        // An error happened.
      })
  }

  return (
    <div className="leftbar">
      <img className="profilepic" src="./assets/images/profile.jpg" alt="" />
      <h5>{userName}</h5>

      <div className="icons">
        <ul>
          <li className={props.active == "home" && "active"}>
            <MdOutlineHome className="icon " />
          </li>
          <li className={props.active == "msg" && "active"}>
            <BsChatDots className="icon" />
          </li>
          <li className={props.active == "notification" && "active"}>
            <FaRegBell className="icon" />
          </li>
          <li className={props.active == "settings" && "active"}>
            <MdOutlineSettings className="icon" />
          </li>
          <li>
            <IoExitOutline className="icon" onClick={handleSignout} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Leftbar
