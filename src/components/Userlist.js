import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue, set, push } from "firebase/database"
import { getAuth } from "firebase/auth"
import { FaUserFriends } from "react-icons/fa"

const Userlist = () => {
  const auth = getAuth()
  const db = getDatabase()
  const [userList, setUserlist] = useState([])
  const [firendReq, setFriendReq] = useState([])
  // const [firendReqSecond, setFirendReqSecond] = useState([])
  const [reqChange, setReqChange] = useState(false)

  // console.log("ksdhg", userList)

  useEffect(() => {
    const starCountRef = ref(db, "users/")
    onValue(starCountRef, (snapshot) => {
      const userArr = []
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

  useEffect(() => {
    const friendReqRef = ref(db, "friendrequest/")
    onValue(friendReqRef, (snapshot) => {
      let friendReqArray = []
      // let friendReqArraySecond = []
      snapshot.forEach((item) => {
        friendReqArray.push(item.val().receiverid + item.val().senderid)
        // friendReqArraySecond.push(item.val().senderid)
        setFriendReq(friendReqArray)
        // setFirendReqSecond(friendReqArraySecond)
      })
    })
  }, [reqChange])

  let handleFriendRequest = (data) => {
    const friendList = ref(db, "friendrequest/")
    const newFriendList = push(friendList)
    set(newFriendList, {
      name: auth.currentUser.displayName,
      receiverid: data.id,
      senderid: auth.currentUser.uid,
    })

    setReqChange(!reqChange)
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
              {console.log("sadkgksd", item)}
              {firendReq.includes(item.id + auth.currentUser.uid) ||
              firendReq.includes(auth.currentUser.uid + item.id) ? (
                <div className="button">
                  <button>
                    <FaUserFriends />
                  </button>
                </div>
              ) : (
                <div className="button">
                  <button
                    onClick={() => {
                      handleFriendRequest(item)
                    }}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          )
      )}
      <div className="divider"></div>
    </div>
  )
}

export default Userlist
