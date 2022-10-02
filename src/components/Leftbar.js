import React, { useEffect, useState } from "react"
import { MdOutlineHome, MdOutlineSettings } from "react-icons/md"
import { BsChatDots } from "react-icons/bs"
import { FaRegBell } from "react-icons/fa"
import { IoExitOutline } from "react-icons/io5"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { Modal, Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const Leftbar = (props) => {
  const auth = getAuth()
  const [userName, setUserName] = useState("")
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = useState("")
  const [userId, setId] = React.useState(false)
  const [creationTime, setCreationTime] = useState("")
  const navigate = useNavigate()

  // const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  let handleModalOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setUserName(user.displayName)
        setEmail(user.email)
        setId(user.uid)
        setCreationTime(user.metadata.creationTime)
      }
    })
  }, [])

  return (
    <div className="leftbar">
      <img className="profilepic" src="./assets/images/profile.jpg" alt="" />
      <h5 onClick={handleModalOpen}>{userName}</h5>

      <div className="icons">
        <ul>
          <li className={props.active == "home" && "active"}>
            <Link to="/home">
              <MdOutlineHome className="icon " />
            </Link>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Profile Informaiton
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h5>Your Email: {email}</h5>
            <h5>Your Id: {userId}</h5>
            <h5>Account creation time: {creationTime}</h5>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Leftbar
