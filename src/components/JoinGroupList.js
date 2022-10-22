import React, { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { BiMessageAltDetail } from "react-icons/bi"
import {
  getDatabase,
  ref as dbref,
  set,
  push,
  onValue,
} from "firebase/database"
import { getAuth, updateProfile } from "firebase/auth"
import { useSelector, useDispatch } from "react-redux"
import { activeChat } from "../slice/activeChatSlice"

const JoinGroupList = () => {
  const db = getDatabase()
  const auth = getAuth()
  const [adminGroupInfo, setAdminGroupInfo] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const groupRef = dbref(db, "groups/")
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

  let handleActiveGroupChat = (item) => {
    let userinfo = {
      status: "group",
      name: item.groupname,
      groupid: item.key,
      groupadminid: item.adminid,
    }

    // if (item.receiverid == auth.currentUser.uid) {
    //   userinfo.id = item.senderid
    //   userinfo.name = item.sendername
    // } else {
    //   userinfo.id = item.receiverid
    //   userinfo.name = item.receivername
    // }

    dispatch(activeChat(userinfo))
  }

  return (
    <div className="grouplist joingroup">
      <h2>Join Group</h2>
      <>
        {adminGroupInfo.map((item, index) => (
          <div key={index}>
            <div className="box" onClick={() => handleActiveGroupChat(item)}>
              <div className="img">
                <img src="assets/images/group.jpg" alt="" />
              </div>
              <div className="name">
                <h4>
                  {item.groupname}{" "}
                  {item.adminid != auth.currentUser.uid ? "" : "(Admin)"}
                </h4>
                <h5>{item.grouptagline}</h5>
              </div>
              <div className="button">
                <button>
                  <BiMessageAltDetail />
                </button>
              </div>
            </div>
            <div className="divider"></div>
          </div>
        ))}

        {/* <div className="box">
          <div className="img">
            <img src="assets/images/group.jpg" alt="" />
          </div>
          <div className="name">
            <h4>3434</h4>
            <h5>asdgsdgds</h5>
          </div>
          <div className="button">
            <button>
              <BiMessageAltDetail />
            </button>
          </div>
        </div>
        <div className="divider"></div> */}
      </>
    </div>
  )
}

export default JoinGroupList
