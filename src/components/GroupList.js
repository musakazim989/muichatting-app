import React, { useEffect, useState } from "react"
import { Divider, Button } from "@mui/material"
import { getAuth, updateProfile } from "firebase/auth"
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import { Modal, Box, Typography } from "@mui/material"
import { AiOutlineCamera } from "react-icons/ai"

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

const GroupList = () => {
  const auth = getAuth()
  const storage = getStorage()

  const [image, setImage] = useState()
  const [loading, setLoaiding] = useState(false)
  const [openImg, setOpenImg] = useState(false)
  const [imgphotoURL, setimgphotoURL] = useState()
  const [userId, setId] = useState(false)
  const [open, setOpen] = useState(false)
  const [cropper, setCropper] = useState()

  const [check, setCheck] = useState(false)

  let handleModaImg = () => {
    setOpenImg(true)
  }

  const handleClose = () => {
    setOpen(false)
    setOpenImg(false)
  }

  useEffect(() => {}, [])

  let handleProfileupload = (e) => {
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
    setLoaiding(true)
    if (typeof cropper !== "undefined") {
      const storageRef = ref(storage, userId)

      const message4 = cropper.getCroppedCanvas().toDataURL()
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        console.log("Uploaded a data_url string!", snapshot)
        setLoaiding(false)
        setOpenImg(false)
        setImage("")
        getDownloadURL(ref(storageRef)).then((url) => {
          console.log(url)
          updateProfile(auth.currentUser, {
            photoURL: url,
          })
            .then(() => {
              console.log("image uploded")
              setCheck(!check)
            })
            .catch((error) => {
              console.log(error)
            })
        })
      })
    }
  }

  return (
    <div className="grouplist">
      <h2>
        Group List
        <div className="buton">
          <Button variant="contained">Create group</Button>
        </div>
      </h2>
      {/* <div className="profilepicbox">
        {!imgphotoURL ? (
          <img className="profilepic" src="./assets/images/avatar.png" alt="" />
        ) : (
          <img className="profilepic" src={imgphotoURL} alt="" />
        )}

        <div className="overlay" onClick={handleModaImg}>
          <AiOutlineCamera className="img-icon" />
        </div>
      </div>

      <div className="divider"></div> */}

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
            {image ? (
              loading ? (
                <button>Uploading...</button>
              ) : (
                <button onClick={getCropData}>Upload Profile Image</button>
              )
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default GroupList
