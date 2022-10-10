import React, { useEffect, useState } from "react"
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage"
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import { MdOutlineHome, MdOutlineSettings } from "react-icons/md"
import { BsChatDots } from "react-icons/bs"
import { FaRegBell } from "react-icons/fa"
import { AiOutlineCamera } from "react-icons/ai"
import { IoExitOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { Modal, Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"

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
  const storage = getStorage()

  const navigate = useNavigate()

  const [userName, setUserName] = useState("")
  const [open, setOpen] = useState(false)
  const [openImg, setOpenImg] = useState(false)
  const [email, setEmail] = useState("")
  const [userId, setId] = useState(false)
  const [creationTime, setCreationTime] = useState("")
  const [imgphotoURL, setimgphotoURL] = useState()

  const [image, setImage] = useState()
  const [cropData, setCropData] = useState("#")
  const [cropper, setCropper] = useState()

  const handleClose = () => {
    setOpen(false)
    setOpenImg(false)
  }

  let handleModalOpen = () => {
    setOpen(true)
  }

  let handleModaImg = () => {
    setOpenImg(true)
  }

  let handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login")
      })
      .catch((error) => {
        // An error happened.
        console.log("leftbar", error)
      })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("this is", user)
      if (user) {
        setUserName(user.displayName)
        setEmail(user.email)
        setId(user.uid)
        setCreationTime(user.metadata.creationTime)
        setimgphotoURL(user.photoURL)
      }
    })
  }, [])

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     console.log("this is", user)
  //     setimgphotoURL(user.photoURL)
  //   })
  // }, [])

  let handleProfileupload = (e) => {
    console.log(e.target.files[0])

    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      const storageRef = ref(storage, userId)

      const message4 = cropper.getCroppedCanvas().toDataURL()
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        console.log("Uploaded a data_url string!", snapshot)

        getDownloadURL(ref(storageRef)).then((url) => {
          console.log(url)

          updateProfile(auth.currentUser, {
            photoURL: url,
          })
            .then(() => {
              console.log("image uploded")
            })
            .catch((error) => {
              console.log(error)
            })
        })
      })
    }
  }

  return (
    <div className="leftbar">
      <div className="profilepicbox">
        {!imgphotoURL ? (
          <img className="profilepic" src="./assets/images/avatar.png" alt="" />
        ) : (
          <img className="profilepic" src={imgphotoURL} alt="" />
        )}

        <div className="overlay" onClick={handleModaImg}>
          <AiOutlineCamera className="img-icon" />
        </div>
      </div>

      <h5 onClick={handleModalOpen}>{userName}</h5>

      <div className="icons">
        <ul>
          <li className={props.active == "home" ? "home" : "active"}>
            <Link to="/home">
              <MdOutlineHome className="icon " />
            </Link>
          </li>
          <li className={props.active == "msg" ? "msg" : "active"}>
            <BsChatDots className="icon" />
          </li>
          <li
            className={
              props.active == "notification" ? "notification" : "active"
            }
          >
            <FaRegBell className="icon" />
          </li>
          <li className={props.active == "settings" ? "settings" : "active"}>
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
          <Typography id="modal-modal-description modal-text" sx={{ mt: 2 }}>
            <div>Your Email: {email}</div>
            <div>Your Id: {userId}</div>
            <div>Account creation time: {creationTime}</div>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openImg}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="leftbarbox">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Profile Picture
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="profilepicbox">
              {!imgphotoURL ? (
                image ? (
                  <div className="img-preview"></div>
                ) : (
                  <img
                    className="profilepic"
                    src="./assets/images/avatar.png"
                    alt=""
                  />
                )
              ) : image ? (
                <div className="img-preview"></div>
              ) : (
                <img className="profilepic" src={imgphotoURL} alt="" />
              )}
            </div>

            <input type="file" onChange={handleProfileupload} />

            <Cropper
              style={{ height: 200, width: "50%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance)
              }}
              guides={true}
            />
            {image && (
              <button onClick={getCropData}>Upload Profile Image</button>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Leftbar
