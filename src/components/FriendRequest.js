import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"
import { getAuth } from "firebase/auth"
import { Alert } from "@mui/material"

const FriendRequest = () => {
  const auth = getAuth()
  const db = getDatabase()

  const [firendReq, setFriendReq] = useState([])

  useEffect(() => {
    const friendReqRef = ref(db, "friendrequest/")
    onValue(friendReqRef, (snapshot) => {
      let friendReqArray = []
      snapshot.forEach((item) => {
        if (item.val().receiverid == auth.currentUser.uid) {
          friendReqArray.push({
            name: item.val().name,
            receiverid: item.val().receiverid,
            senderid: item.val().senderid,
          })
        }

        setFriendReq(friendReqArray)
      })
    })
  }, [])

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
              <h4>{item.name}</h4>
              <h5>The best fishing gourp in Urla</h5>
            </div>
            <div className="button">
              <button>Accept</button>
            </div>
          </div>

          <div className="divider"></div>
        </div>
      ))}

      {firendReq.length == 0 && (
        <Alert severity="info">No friend request found.</Alert>
      )}
    </div>
  )
}

export default FriendRequest
