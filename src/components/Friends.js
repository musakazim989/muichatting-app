import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"
import { Alert } from "@mui/material"
import { getAuth } from "firebase/auth"

const Friends = () => {
  const auth = getAuth()
  const db = getDatabase()
  const [showFriends, setFriendShow] = useState([])
  console.log(showFriends)

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

  return (
    <div className="grouplist friendlist ">
      <h2>Friends</h2>
      {showFriends.length === 0 && (
        <Alert severity="info">You have no friends.</Alert>
      )}
      {showFriends.map((item, index) => (
        <div key="index">
          {console.log("testing", item)}
          <div className="box">
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
              <p>Today, 8:56pm</p>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      ))}
    </div>
  )
}

export default Friends
