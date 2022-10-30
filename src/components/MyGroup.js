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
import { getDatabase, ref, onValue } from "firebase/database"
import { getAuth, updateProfile } from "firebase/auth"

const MyGroup = () => {
  const auth = getAuth()
  const [adminGroupInfo, setAdminGroupInfo] = useState([])
  const [groupInfo, setGroupInfo] = useState([])
  const [open, setOpen] = React.useState(false)

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
            groupname: item.val().groupname,
            grouptagline: item.val().grouptagline,
            key: item.key,
          }
          groupArr.push(groupinfo)
        }
      })
      setAdminGroupInfo(groupArr)
    })
  }, [])

  useEffect(() => {
    const db = getDatabase()
    const groupInfoRef = ref(db, "groupjoinrequest")
    onValue(groupInfoRef, (snapshot) => {
      let groupArr = []
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().adminid) {
          let groupinfo = {
            adminid: item.val().adminid,
            userid: item.val().userid,
            username: item.val().username,
            userprofile: item.val().userprofile,
            key: item.key,
          }
          groupArr.push(groupinfo)
        }
      })
      setGroupInfo(groupArr)
    })
  }, [])

  const handleClose = () => setOpen(false)
  const handleOpen = () => {
    setOpen(true)
  }

  let handleGroupApprove = (item) => {
    console.log(item)
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
                    <p>3/6//2022</p>
                    <button onClick={handleOpen} variant="contained">
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
          {groupInfo.length == 0 && (
            <Alert severity="info">No group join request found.</Alert>
          )}
          {groupInfo.map((item, index) => (
            <>
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

              <div key={index}>
                <div className="box mymodal">
                  <div className="img">
                    <img src="./assets/images/personal.jpg" alt="" />
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
                    <button
                      onClick={() => {
                        handleGroupApprove(item)
                      }}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
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
