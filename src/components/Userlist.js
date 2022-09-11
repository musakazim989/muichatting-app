import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"

const Userlist = () => {
  const db = getDatabase()

  const [userlist, setUserlist] = useState([])

  console.log(userlist)

  useEffect(() => {
    const arr = []
    console.log("slkhg", arr)
    const starCountRef = ref(db, "users/")
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        // console.log(item.val())
        arr.push(item.val())
      })
    })
    setUserlist(arr)
  }, [])

  return (
    <div className="grouplist friendlist userlist">
      <h2>User List</h2>
      <div className="box">
        <div className="img">
          <img src="./assets/images/group.jpg" alt="" />
        </div>
        <div className="name">
          <h4>Fishing 2020</h4>
          <h5>The best fishing gourp in Urla</h5>
        </div>
        <div className="button">
          <button>+</button>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  )
}

export default Userlist
