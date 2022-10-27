import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database"
import { getAuth } from "firebase/auth"

const BlockUser = () => {
  const db = getDatabase()
  const auth = getAuth()

  const [blocklist, setBlocklist] = useState([])

  useEffect(() => {
    const blockRef = ref(db, "block/")
    onValue(blockRef, (snapshot) => {
      let blockArr = []
      snapshot.forEach((item) => {
        if (item.val().blockid == auth.currentUser.uid) {
          blockArr.push({
            id: item.key,
            blockname: item.val().blockname,
            blockid: item.val().blockid,
            blockbyid: item.val().blockbyid,
            blockbyname: item.val().blockbyname,
          })
        }
      })
      setBlocklist(blockArr)
    })
  }, [])

  console.log(blocklist)

  return (
    <div className="grouplist friendlist mygroup">
      <h2>Block Users</h2>
      {blocklist.map((item) => (
        <div className="box">
          <div className="img">
            <img src="./assets/images/group.jpg" alt="" />
          </div>
          <div className="name">
            <h4>{item.blockname}</h4>
            <h5>The best fishing Group</h5>
          </div>
          <div className="button">
            <div className="info">
              <p>3/6//2022</p>
              <button>Unblock</button>
            </div>
          </div>
        </div>
      ))}

      <div className="divider"></div>

      {/* <div className="box">
        <div className="img">
          <img src="./assets/images/group.jpg" alt="" />
        </div>
        <div className="name">
          <h4>MERN</h4>

          <h5>The best fishing Group</h5>
        </div>
        <div className="button">
          <div className="info">
            <p>3/6//2022</p>
            <button>Unblock</button>
          </div>
        </div>
      </div>
      <div className="divider"></div> */}
    </div>
  )
}

export default BlockUser
