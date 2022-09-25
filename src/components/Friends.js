import React, { useEffect } from "react"
import { getDatabase, ref, onValue } from "firebase/database"
import { useState } from "react"

const Friends = () => {
  const db = getDatabase()
  let [showFriends, setFriendShow] = useState([])

  useEffect(() => {
    const starCountRef = ref(db, "friends/")
    let friendsArr = []
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        {
          friendsArr.push({ friendsname: item.val().sendername })
        }
      })
      setFriendShow(friendsArr)
    })
  }, [])

  return (
    <div className="grouplist friendlist">
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
    </div>
  )
}

export default Friends
