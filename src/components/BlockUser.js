import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database"
import { getAuth } from "firebase/auth"
import { Alert } from "@mui/material"

const BlockUser = () => {
  const db = getDatabase()
  const auth = getAuth()

  const [blocklist, setBlocklist] = useState([])

  useEffect(() => {
    const blockRef = ref(db, "block/")
    onValue(blockRef, (snapshot) => {
      let blockArr = []
      snapshot.forEach((item) => {
        console.log(item.val())
        if (item.val().blockbyid == auth.currentUser.uid) {
          blockArr.push({
            id: item.key,
            blockname: item.val().blockname,
            blockid: item.val().blockid,
            blockbyname: item.val().blockbyname,
            blockbyid: item.val().blockbyid,
          })
        }
      })
      setBlocklist(blockArr)
    })
  }, [])

  let handleUnblock = (item) => {
    console.log(item)
    set(push(ref(db, "friends")), {
      // id: item.id, it is friendreq id if needed get it with props
      receivername: item.blockname,
      receiverid: item.blockid,
      sendername: item.blockbyname,
      senderid: item.blockbyid,
      date: `${new Date().getDate()}/${new Date().getMonth() +
        1}/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "block/" + item.id))
    })
  }

  return (
    <div className="grouplist friendlist mygroup">
      <h2>Block Users</h2>
      {blocklist.map((item) => (
        <div className="box">
          <div className="img">
            <img src="./assets/images/group.jpg" alt="" />
          </div>
          <div className="name">
            {auth.currentUser.uid == item.blockbyid ? (
              <h4>{item.blockbyname}thyertyhetyhrt</h4>
            ) : (
              <h4>{item.blockname}</h4>
            )}
            <h5>The best fishing Group</h5>
          </div>
          <div className="button">
            <div className="info">
              <p>3/6//2022</p>
              <button onClick={() => handleUnblock(item)}>Unblock</button>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      ))}
      {blocklist.length === 0 && (
        <Alert severity="info">You didn't block any user.</Alert>
      )}
    </div>
  )
}

export default BlockUser
