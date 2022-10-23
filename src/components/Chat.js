import React, { useState, useEffect } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { IoIosSend } from "react-icons/io"
import { AiOutlineCamera } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { getAuth, updateProfile } from "firebase/auth"
import { getDatabase, ref, set, push, onValue } from "firebase/database"

const Chat = () => {
  const auth = getAuth()
  const db = getDatabase()
  const user = useSelector((state) => state.activeChat.active)
  const [msg, setMsg] = useState("")
  const [msgList, setMsgList] = useState([])
  const [check, setCheck] = useState(false)

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
        arr.push(item.val())
      })
      setMsgList(arr)
    })
  }, [])

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
              {console.log(item)}
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
          <AiOutlineCamera className="camera" />
          <button onClick={handleMsgSend}>
            <IoIosSend className="msg-icon" />
          </button>
        </div>
      </div>
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

export default Chat
