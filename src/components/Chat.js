import React, { useState, useEffect } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { IoIosSend } from "react-icons/io"
import { AiOutlineCamera } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { getAuth, updateProfile } from "firebase/auth"
import { getDatabase, ref, set, push, onValue } from "firebase/database"
import { Modal, Button, Box, Typography, CircularProgress } from "@mui/material"
import {
  getStorage,
  ref as imgref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import moment from "moment/moment"

const Chat = () => {
  const auth = getAuth()
  const db = getDatabase()
  const storage = getStorage()
  const user = useSelector((state) => state.activeChat.active)

  const [msg, setMsg] = useState("")
  const [msgList, setMsgList] = useState([])
  const [check, setCheck] = useState(false)
  const [file, setFile] = useState(null)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(null)
  const [mydate, setmyDate] = useState(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  let handleMessage = (e) => {
    setMsg(e.target.value)
  }

  let handleMsgSend = () => {
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
            date: `${new Date().getFullYear()}-${new Date().getMonth() +
              1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setCheck(!check)
            setMsg("")
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
        setmyDate(item.val().date)
      })
      setMsgList(arr)
    })
  }, [user.id])

  let handleImagload = (e) => {
    setFile(e.target.files[0])
  }

  let handleImageSend = (e) => {
    setOpen(true)
    const singleimgref = imgref(storage, "singleimage/" + file.name)
    const uploadTask = uploadBytesResumable(singleimgref, file)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
        setProgress(progress)
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL)

            if (user.status !== undefined) {
              if (file !== "") {
                if (user.status == "group") {
                  console.log("group")
                } else {
                  set(push(ref(db, "singlemsg")), {
                    whosendid: auth.currentUser.uid,
                    whosendname: auth.currentUser.displayName,
                    whoreceived: user.id,
                    whoreceivedname: user.name,
                    msg: msg,
                    img: downloadURL,
                    date: `${new Date().getFullYear()}-${new Date().getMonth() +
                      1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                  })
                }
              }
            }
          })
          .then(() => {
            setFile("")
            setOpen(false)
            setProgress(null)
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
            item.msg ? (
              <div className="msg" style={alignright}>
                <p style={msgsend}>{item.msg}</p>
                <div className="date" style={dateSend}>
                  {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                </div>
              </div>
            ) : (
              <div className="msg" style={alignright}>
                <div className="chatimage" style={msgsend}>
                  <img src={item.img} alt="" />
                </div>
                <div className="date" style={dateSend}>
                  {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                </div>
              </div>
            )
          ) : item.msg ? (
            <div className="msg" style={alignleft}>
              <p style={msgreceive}>{item.msg}</p>
              <div className="date" style={dateReceive}>
                {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
              </div>
            </div>
          ) : (
            <div className="msg" style={alignleft}>
              <div className="chatimage" style={dateReceive}>
                <img src={item.img} alt="" />
              </div>
              <div className="date" style={msgreceive}>
                {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
              </div>
            </div>
          )
        )}
      </div>

      <div className="msg-box">
        <div className="msgwrite">
          <input
            onChange={handleMessage}
            type="text"
            placeholder="Message"
            value={msg}
          />
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
          {progress ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Image Upload
              </Typography>

              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress variant="determinate" value={progress} />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    {progress && `${Math.round(progress)}%`}
                  </Typography>
                </Box>
              </Box>
            </div>
          ) : (
            <>
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
                onClick={handleImageSend}
                variant="contained"
                style={{ marginTop: "20px" }}
              >
                Upload
              </Button>
            </>
          )}
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
