import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue, set, push } from "firebase/database"
import { getAuth } from "firebase/auth"
import { FaUserFriends } from "react-icons/fa"
import { BsPersonCheckFill } from "react-icons/bs"

const Userlist = () => {
  const auth = getAuth()
  const db = getDatabase()
  const [userList, setUserlist] = useState([])
  const [firendReq, setFriendReq] = useState([])
  const [reqChange, setReqChange] = useState(false)
  const [friends, setFriends] = useState([])
  const [check, setCheck] = useState(false)

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
  }, [check])

  useEffect(() => {
    const friendReqRef = ref(db, "friendrequest/")
    onValue(friendReqRef, (snapshot) => {
      let friendReqArray = []
      snapshot.forEach((item) => {
        friendReqArray.push(item.val().receiverid + item.val().senderid)
        setFriendReq(friendReqArray)
      })
    })
  }, [reqChange])

  useEffect(() => {
    const friendsRef = ref(db, "friends/")
    onValue(friendsRef, (snapshot) => {
      let friendsArray = []
      snapshot.forEach((item) => {
        friendsArray.push(item.val().receiverid + item.val().senderid)
        setFriends(friendsArray)
      })
    })
    setCheck(!check)
  }, [])

  let handleFriendRequest = (data) => {
    const friendList = ref(db, "friendrequest/")
    const newFriendList = push(friendList)
    set(newFriendList, {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      receivername: data.username,
      receiverid: data.id,
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

              {friends.includes(item.id + auth.currentUser.uid) ||
              friends.includes(auth.currentUser.uid + item.id) ? (
                <div className="button">
                  <button>
                    <FaUserFriends />
                  </button>
                </div>
              ) : firendReq.includes(item.id + auth.currentUser.uid) ||
                firendReq.includes(auth.currentUser.uid + item.id) ? (
                <div className="button">
                  <button>
                    <BsPersonCheckFill />
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
              <div className="divider"></div>
            </div>
          )
      )}
    </div>
  )
}

export default Userlist
