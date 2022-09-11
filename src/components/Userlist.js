import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue } from "firebase/database"

const Userlist = () => {
  const db = getDatabase()

  const [userList, setUserlist] = useState([])

  console.log("ksdhg", userList)

  // useEffect(() => {
  //   let userArr = []
  //   const userRef = ref(db, "users/")
  //   onValue(userRef, (snapshot) => {
  //     snapshot.forEach((item) => {
  //       userArr.push(item.val())
  //     })
  //     setUserlist(userArr)
  //   })
  // }, [])

  useEffect(() => {
    console.log("first")
    const userArr = []
    const starCountRef = ref(db, "users/")
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        userArr.push(item.val())
      })
      setUserlist(userArr)
    })
  }, [])

  return (
    <div className="grouplist friendlist userlist">
      <h2>User List</h2>
      {userList.map((item, index) => (
        <div className="box" key={index}>
          <div className="img">
            <img src="./assets/images/group.jpg" alt="" />
          </div>
          <div className="name">
            <h4>{item.username}</h4>
            <h5>The best fishing gourp in Urla</h5>
          </div>
          <div className="button">
            <button>+</button>
          </div>
        </div>
      ))}
      <div className="divider"></div>
    </div>
  )
}

export default Userlist
