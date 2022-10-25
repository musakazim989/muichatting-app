import React, { useState, useEffect } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { IoIosSend } from "react-icons/io"
import { AiOutlineCamera } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { getAuth, updateProfile } from "firebase/auth"
import { getDatabase, ref, set, push, onValue } from "firebase/database"
import { Modal, Button, Box, Typography } from "@mui/material"
import {
  getStorage,
  ref as imgref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"

const Chat = () => {
  const auth = getAuth()
  const db = getDatabase()
  const storage = getStorage()
  const user = useSelector((state) => state.activeChat.active)

  const [msg, setMsg] = useState("")
  const [msgList, setMsgList] = useState([])
  const [check, setCheck] = useState(false)
  const [file, setFile] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  let handleMessage = (e) => {
    setMsg(e.target.value)
  }

  let handleMsgSend = () => {
    console.log("first")
    if (user.status !== undefined) {
      if (msg !== "") {
        if (user.status == "group") {
          console.log("group")
        } else {
          set(push(ref(db, "singlemsg")), {
            whosendid: auth.currentUser.uid,
            whosendname: auth.currentUser.displayName,
            whoreceived: user.id,
            whoreceivedname: user.name,
            msg: msg,
          }).then(() => {
            setCheck(!check)
          })
        }
      }
    }
  }

  useEffect(() => {
    onValue(ref(db, "singlemsg"), (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (
          (item.val().whosendid == auth.currentUser.uid &&
            item.val().whoreceived == user.id) ||
          (item.val().whosendid == user.id &&
            item.val().whoreceived == auth.currentUser.uid)
        )
          arr.push(item.val())
      })
      setMsgList(arr)
    })
  }, [user.id])

  let handleImagload = (e) => {
    setFile(e.target.files)
  }
  let handleImageUpload = (e) => {
    const singleimgref = imgref(storage, "singleimage/" + file[0].name)
    const uploadTask = uploadBytesResumable(singleimgref, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL)
        })
      }
    )
  }

  return (
    <div className=" chat">
      <div className="top-area">
        <div className="info">
          <picture className="img">
            <img src="assets/images/group.jpg" alt="" />
            <div className="round"></div>
          </picture>
          <div className="identity">
            <h3>{user.name}</h3>
            <p>online</p>
          </div>
        </div>
        <div className="dots">
          <BiDotsVerticalRounded />
        </div>
      </div>
      <div className="chatarea">
        {msgList.map((item, index) =>
          item.whosendid == auth.currentUser.uid ? (
            <div className="msg" style={alignright}>
              <p style={msgsend}>{item.msg}</p>
              <div className="date" style={dateSend}>
                Today, 2:01pm
              </div>
            </div>
          ) : (
            <div className="msg" style={alignleft}>
              <p style={msgreceive}>{item.msg}</p>
              <div className="date" style={dateReceive}>
                Today, 2:01pm
              </div>
            </div>
          )
        )}
      </div>

      <div className="msg-box">
        <div className="msgwrite">
          <input onChange={handleMessage} type="text" placeholder="Message" />
          <AiOutlineCamera onClick={handleOpen} className="camera" />
          <button onClick={handleMsgSend}>
            <IoIosSend className="msg-icon" />
          </button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "20px" }}
          >
            Image Upload
          </Typography>
          <Typography>
            <input type="file" onChange={handleImagload} />
          </Typography>
          <Button
            onClick={handleImageUpload}
            variant="contained"
            style={{ marginTop: "20px" }}
          >
            Upload
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

let msgsend = {
  background: "#3d0e88",
  color: "#fff",
}
let msgreceive = {
  background: "#F1F1F1",
}

let alignright = {
  justifyContent: "right",
}
let alignleft = {
  justifyContent: "left",
}

let dateSend = {
  right: "10px",
}
let dateReceive = {
  left: "10px",
}
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

export default Chat
