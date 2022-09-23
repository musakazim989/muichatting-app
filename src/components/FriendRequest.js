import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database"
import { getAuth } from "firebase/auth"
import { Alert } from "@mui/material"

const FriendRequest = () => {
  const auth = getAuth()
  const db = getDatabase()

  const [firendReq, setFriendReq] = useState([])
  let [dlt, setDlt] = useState(true)

  useEffect(() => {
    const friendReqRef = ref(db, "friendrequest/")
    onValue(friendReqRef, (snapshot) => {
      let friendReqArray = []
      snapshot.forEach((item) => {
        if (item.val().receiverid == auth.currentUser.uid) {
          friendReqArray.push({
            id: item.key,
            recivername: item.val().recivername,
            receiverid: item.val().receiverid,
            sendername: item.val().sendername,
            senderid: item.val().senderid,
          })
        }

        setFriendReq(friendReqArray)
      })
    })
    console.log("second")
  }, [dlt])

  let handleAcceptFriend = (item) => {
    const db = getDatabase()
    set(push(ref(db, "friends")), {
      id: item.id,
      recivername: item.recivername,
      receiverid: item.receiverid,
      sendername: item.sendername,
      senderid: item.senderid,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id)).then(() => {
        console.log("first")
        setDlt(!dlt)
      })
    })
  }

  return (
    <div className="grouplist">
      <h2>Friend Request</h2>

      {firendReq.map((item, index) => (
        <div key={index}>
          <div className="box">
            <div className="img">
              <img src="./assets/images/personal.jpg" alt="" />
            </div>
            <div className="name">
              <h4>{item.sendername}</h4>
              <h5>The best fishing gourp in Urla</h5>
            </div>
            <div className="button">
              <button onClick={() => handleAcceptFriend(item)}>Accept</button>
            </div>
          </div>

          <div className="divider"></div>
        </div>
      ))}

      {firendReq.length === 0 && (
        <Alert severity="info">No friend request found.</Alert>
      )}
    </div>
  )
}

export default FriendRequest
