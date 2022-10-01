import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"
import { Alert } from "@mui/material"
import { getAuth } from "firebase/auth"

const Friends = () => {
  const auth = getAuth()
  const db = getDatabase()
  const [showFriends, setFriendShow] = useState([])

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
      {showFriends.length > 1 ? (
        <h2>{showFriends.length} Friends</h2>
      ) : (
        <h2>Friend</h2>
      )}
      {showFriends.length === 0 && (
        <Alert severity="info">You have no friends.</Alert>
      )}
      {showFriends.map((item, index) => (
        <>
          <div key="index">
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
                <p>{item.date}</p>
              </div>
            </div>
          </div>
          <div className="divider"></div>
        </>
      ))}
    </div>
  )
}

export default Friends
