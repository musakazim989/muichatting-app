import React, { useEffect } from "react"
import { getDatabase, ref, set } from "firebase/database"

const Friends = () => {
  const db = getDatabase()
  useEffect(() => {
    set(ref(db, "friends/"), {
      username: name,
      email: email,
    })
  }, [])

  return (
    <div className="grouplist friendlist">
      <h2>Friends</h2>
      <div className="box">
        <div className="img">
          <img src="./assets/images/group.jpg" alt="" />
        </div>
        <div className="name">
          <h4>Fishing 2020</h4>
          <h5>The best fishing Group</h5>
        </div>
        <div className="button">
          <p>Today, 8:56pm</p>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  )
}

export default Friends
