import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"

const FriendRequest = () => {
  const db = getDatabase()
  const [friendsData, setFriendsData] = useState()

  useEffect(() => {
    let userArr = []
    const starCountRef = ref(db, "friendrequest")
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val()
      console.log(data)
    })

    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        userArr.push({
          username: item.val().username,
          email: item.val().email,
          id: item.key,
        })
      })
      setUserlist(userArr)
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
