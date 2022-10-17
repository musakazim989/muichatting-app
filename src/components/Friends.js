import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"
import { Alert } from "@mui/material"
import { getAuth } from "firebase/auth"
import { BiMessageAltDetail } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux"
import { activeChat } from "../slice/activeChatSlice"

const Friends = (props) => {
  const auth = getAuth()
  const db = getDatabase()
  const [showFriends, setFriendShow] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const starCountRef = ref(db, "friends/")
    onValue(starCountRef, (snapshot) => {
      let friendsArr = []
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().receiverid ||
          auth.currentUser.uid == item.val().senderid
        ) {
          friendsArr.push(item.val())
        }
      })
      setFriendShow(friendsArr)
    })
  }, [])

  let handleActiveChat = (item) => {
    let userinfo = {}
    if (item.receiverid == auth.currentUser.uid) {
      userinfo.id = item.senderid
      userinfo.name = item.sendername
    } else {
      userinfo.id = item.receiverid
      userinfo.name = item.receivername
    }

    dispatch(activeChat(userinfo))
  }

  return (
    <div className="grouplist friendlist ">
      {showFriends.length > 1 ? (
        <h2>{showFriends.length} Friends</h2>
      ) : (
        <h2>Friend</h2>
      )}
      {showFriends.length === 0 && (
        <Alert severity="info">You have no friends.</Alert>
      )}
      {showFriends.map((item, index) => (
        <div className="box" key={index} onClick={() => handleActiveChat(item)}>
          <div className="img">
            <img src="./assets/images/group.jpg" alt="" />
          </div>
          <div className="name">
            {auth.currentUser.uid == item.senderid ? (
              <h4>{item.receivername}</h4>
            ) : (
              <h4>{item.sendername}</h4>
            )}
            <h5>The best fishing Group</h5>
          </div>
          <div className="button">
            {props.item == "date" ? (
              <p>{item.date}</p>
            ) : (
              <button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BiMessageAltDetail />
              </button>
            )}
          </div>
          <div className="divider"></div>
        </div>
      ))}
    </div>
  )
}

export default Friends
