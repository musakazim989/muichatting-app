import React, { useState, useEffect } from "react"
import {
  Button,
  Alert,
  Modal,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material"
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
  update,
} from "firebase/database"
import { getAuth, updateProfile } from "firebase/auth"

const MyGroup = () => {
  const auth = getAuth()
  const db = getDatabase()
  const [adminGroupInfo, setAdminGroupInfo] = useState([])
  const [groupInfo, setGroupInfo] = useState([])
  const [open, setOpen] = useState(false)
  const [groupMemberList, setGroupMemberList] = useState("")

  useEffect(() => {
    const db = getDatabase()
    const groupRef = ref(db, "groups/")
    onValue(groupRef, (snapshot) => {
      let groupArr = []
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().adminid) {
          let groupinfo = {
            adminid: item.val().adminid,
            adminname: item.val().adminname,
            groupid: item.key,
            groupname: item.val().groupname,
            grouptagline: item.val().grouptagline,
          }
          groupArr.push(groupinfo)
        }
      })
      setAdminGroupInfo(groupArr)
    })
  }, [])

  const handleClose = () => setOpen(false)

  const handleOpen = (group) => {
    setOpen(true)
    const db = getDatabase()
    const groupInfoRef = ref(db, "groupjoinrequest")
    onValue(groupInfoRef, (snapshot) => {
      let groupArr = []
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().adminid &&
          item.val().groupid == group.groupid
        ) {
          let groupinfo = {
            adminid: item.val().adminid,
            userid: item.val().userid,
            username: item.val().username,
            groupid: item.val().groupid,
            userprofile: item.val().userprofile,
            key: item.key,
          }
          groupArr.push(groupinfo)
        }
      })
      setGroupInfo(groupArr)
    })
  }

  useEffect(() => {
    const groupRef = ref(db, "groupmembers")
    onValue(groupRef, (snapshot) => {
      let grouprefarr = []
      snapshot.forEach((item) => {
        {
          let groupinfo = {
            adminid: item.val().adminid,
            userid: item.val().userid,
            username: item.val().username,
            groupid: item.val().groupid,
            // userprofile: item.val().userprofile,
            key: item.key,
          }
          grouprefarr.push(groupinfo)
        }
      })
      setGroupMemberList(grouprefarr)
    })
  }, [])

  let handleGroupApprove = (item) => {
    console.log(item)
    const db = getDatabase()
    set(push(ref(db, "groupmembers/")), {
      adminid: item.adminid,
      userid: item.userid,
      username: item.username,
      groupid: item.groupid,
      // userprofile: item.userprofile,
      key: item.key,
    })
      // .then(() => {
      //   update(ref(db, "groupmembers/" + item.userid), {
      //     groups: [item.groupid],
      //   })
      // })
      .then(() => {
        remove(ref(db, "groupjoinrequest/" + item.key))
        setOpen(false)
      })
  }

  let handleGroupDecline = (item) => {
    console.log(item)
    remove(ref(db, "groupjoinrequest/" + item.key))
  }

  return (
    <div className="grouplist friendlist mygroup">
      <h2>My Group</h2>
      {adminGroupInfo.map(
        (item) =>
          item.adminid == auth.currentUser.uid && (
            <>
              <div className="box box2">
                <div className="img">
                  <img src="./assets/images/group.jpg" alt="" />
                </div>
                <div className="name">
                  <h4>{item.groupname}</h4>
                  <h5>{item.grouptagline}</h5>
                </div>
                <div className="button">
                  <div className="info">
                    <button
                      onClick={() => handleOpen(item)}
                      variant="contained"
                    >
                      Join Request
                    </button>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
            </>
          )
      )}

      {adminGroupInfo.length == 0 && (
        <Alert severity="info">You don't make any group.</Alert>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Group request list" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          {groupInfo.length == 0 && (
            <Alert severity="info">No group join request found.</Alert>
          )}

          {groupInfo.map((item, index) => (
            <>
              <div key={index} className="modal-box">
                <div className="box mymodal">
                  <div className="img">
                    <img src={item.userprofileimage} alt="" />
                  </div>
                  <div className="name">
                    <h4>{item.username}</h4>
                    <h5>
                      {item.username}{" "}
                      <span style={{ width: "100px" }}>
                        - wants to join the group
                      </span>
                    </h5>
                  </div>
                  <div className="button">
                    <button onClick={() => handleGroupApprove(item)}>
                      Approve
                    </button>
                    <div className="remove">
                      <button
                        onClick={() => {
                          handleGroupDecline(item)
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </Box>
      </Modal>
    </div>
  )
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

export default MyGroup
