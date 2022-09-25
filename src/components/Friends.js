import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"
import { Alert } from "@mui/material"
import { getAuth } from "firebase/auth"

const Friends = () => {
  const auth = getAuth()
  const db = getDatabase()
  let [showFriends, setFriendShow] = useState([])
  console.log(showFriends)
  useEffect(() => {
    const starCountRef = ref(db, "friends/")
    onValue(starCountRef, (snapshot) => {
      let friendsArr = []
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().receiverid) {
          friendsArr.push({ friendsname: item.val().sendername })
        } else {
          friendsArr.push({ friendsname: item.val().recivername })
        }
      })
      setFriendShow(friendsArr)
    })
  }, [])

  return (
    <div className="grouplist friendlist ">
      <h2>Friends</h2>
      {showFriends.map((item, index) => (
        <div key="index">
          <div className="box">
            <div className="img">
              <img src="./assets/images/group.jpg" alt="" />
            </div>
            <div className="name">
              <h4>{item.friendsname}</h4>
              <h5>The best fishing Group</h5>
            </div>
            <div className="button">
              <p>Today, 8:56pm</p>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      ))}
      {showFriends.length === 0 && <Alert severity="info">No friends.</Alert>}
    </div>
  )
}

export default Friends
