import React from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { IoIosSend } from "react-icons/io"
import { AiOutlineCamera } from "react-icons/ai"

const Chat = () => {
  return (
    <div className=" chat">
      <div className="top-area">
        <div className="info">
          <picture className="img">
            <img src="assets/images/group.jpg" alt="" />
            <div className="round"></div>
          </picture>
          <div className="identity">
            <h3>Musa Kazim</h3>
            <p>online</p>
          </div>
        </div>
        <div className="dots">
          <BiDotsVerticalRounded />
        </div>
      </div>
      <div className="chatarea">
        <div className="msg" style={alignright}>
          <p style={msgsend}>Hey there!</p>
          <div className="date" style={dateSend}>
            Today, 2:01pm
          </div>
        </div>

        <div className="msg" style={alignright}>
          <p style={msgsend}>Hey there!</p>
          <div className="date" style={dateSend}>
            Today, 2:01pm
          </div>
        </div>

        <div className="msg" style={alignleft}>
          <p style={msgreceive}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nemo
            sequi fuga obcaecati inventore maxime numquam sunt molestias totam
            quae.
          </p>
          <div className="date" style={dateReceive}>
            Today, 2:01pm
          </div>
        </div>

        <div className="msg" style={alignright}>
          <p style={msgsend}>Hey there!</p>
          <div className="date" style={dateSend}>
            Today, 2:01pm
          </div>
        </div>

        <div className="msg" style={alignright}>
          <p style={msgsend}>Hey there!</p>
          <div className="date" style={dateSend}>
            Today, 2:01pm
          </div>
        </div>

        <div className="msg" style={alignleft}>
          <p style={msgreceive}>Hey there!</p>
          <div className="date" style={dateReceive}>
            Today, 2:01pm
          </div>
        </div>

        <div className="msg" style={alignright}>
          <p style={msgsend}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            porro?
          </p>
          <div className="date" style={dateSend}>
            Today, 2:01pm
          </div>
        </div>

        <div className="msg" style={alignright}>
          <p style={msgsend}>Hey there!</p>
          <div className="date" style={dateSend}>
            Today, 2:01pm
          </div>
        </div>

        <div className="msg" style={alignright}>
          <div style={msgsend} className="chatimage">
            <img src="assets/images/login.jpg" alt="" />
          </div>
          <div className="date" style={dateSend}>
            Today, 2:01pm
          </div>
        </div>

        <div className="msg" style={alignleft}>
          <div style={msgreceive} className="chatimage">
            <img src="assets/images/login.jpg" alt="" />
          </div>
          <div className="date" style={dateReceive}>
            Today, 2:01pm
          </div>
        </div>
      </div>
      <div className="msg-box">
        <div className="msgwrite">
          <input type="text" placeholder="Message" />
          <AiOutlineCamera className="camera" />
          <button>
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
