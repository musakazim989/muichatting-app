import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue, set } from "firebase/database"
import { getAuth } from "firebase/auth"

const Userlist = () => {
  const auth = getAuth()
  const db = getDatabase()

  // console.log("currentuser", auth.currentUser)

  const [userList, setUserlist] = useState([])

  // console.log("ksdhg", userList)

  useEffect(() => {
    const userArr = []
    const starCountRef = ref(db, "users/")
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        // console.log(item)
        userArr.push({
          username: item.val().username,
          email: item.val().email,
          id: item.key,
        })
      })
      setUserlist(userArr)
    })
  }, [])

  let handleFriendRequest = (data) => {
    set(ref(db, "friendrequest"), {
      name: data.username,
      receiverid: data.id,
      senderid: auth.currentUser.uid,
    })
  }

  return (
    <div className="grouplist friendlist userlist">
      <h2>User List</h2>
      {userList.map(
        (item, index) =>
          auth.currentUser.uid !== item.id && (
            <div className="box" key={index}>
              <div className="img">
                <img src="./assets/images/group.jpg" alt="" />
              </div>
              <div className="name">
                <h4>{item.username}</h4>
                <h5>{item.email}</h5>
              </div>
              <div className="button">
                <button
                  onClick={() => {
                    handleFriendRequest(item)
                  }}
                >
                  +
                </button>
              </div>
            </div>
          )
      )}
      <div className="divider"></div>
    </div>
  )
}

export default Userlist
