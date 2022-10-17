import React, { useState, useEffect } from "react"
import { Button } from "@mui/material"
import { getDatabase, ref, onValue } from "firebase/database"
import { getAuth, updateProfile } from "firebase/auth"

const MyGroup = () => {
  const auth = getAuth()
  const [adminGroupInfo, setAdminGroupInfo] = useState([])

  useEffect(() => {
    const db = getDatabase()
    const groupRef = ref(db, "groups/")
    onValue(groupRef, (snapshot) => {
      let groupArr = []
      snapshot.forEach((item) => {
        let groupinfo = {
          adminid: item.val().adminid,
          adminname: item.val().adminname,
          groupname: item.val().groupname,
          grouptagline: item.val().grouptagline,
          key: item.key,
        }
        groupArr.push(groupinfo)
      })
      setAdminGroupInfo(groupArr)
    })
  }, [])

  return (
    <div className="grouplist friendlist mygroup">
      <h2>My Group</h2>
      {adminGroupInfo.map(
        (item) =>
          item.adminid == auth.currentUser.uid && (
            <>
              {console.log(item)}
              <div className="box">
                <div className="img">
                  <img src="./assets/images/group.jpg" alt="" />
                </div>
                <div className="name">
                  <h4>{item.groupname}</h4>
                  <h5>{item.grouptagline}</h5>
                </div>
                <div className="button">
                  <div className="info">
                    <p>3/6//2022</p>
                    <button variant="contained">Info</button>
                  </div>
                </div>
              </div>
            </>
          )
      )}

      <div className="divider"></div>
    </div>
  )
}

export default MyGroup
