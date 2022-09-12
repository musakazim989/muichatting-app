import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"

const FriendRequest = () => {
  const db = getDatabase()

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/")
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        console.log(item.val().name)
      })
    })
  }, [])

  return (
    <div className="grouplist">
      <h2>Friend Request</h2>

      <div className="box">
        <div className="img">
          <img src="./assets/images/personal.jpg" alt="" />
        </div>
        <div className="name">
          <h4>Fishing 2020</h4>
          <h5>The best fishing gourp in Urla</h5>
        </div>
        <div className="button">
          <button>Accept</button>
        </div>
      </div>

      <div className="divider"></div>
    </div>
  )
}

export default FriendRequest
