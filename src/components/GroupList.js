import React, { useEffect, useState } from "react"
import { Divider, Button } from "@mui/material"
import { getAuth, updateProfile } from "firebase/auth"
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage"
import {
  getDatabase,
  ref as dbref,
  set,
  push,
  onValue,
} from "firebase/database"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import { Modal, Box, Typography, TextField, Alert } from "@mui/material"
import { AiOutlineCamera } from "react-icons/ai"

const GroupList = () => {
  const auth = getAuth()
  const storage = getStorage()
  const db = getDatabase()

  const [loading, setLoaiding] = useState(false)
  const [openImg, setOpenImg] = useState(false)
  const [imgphotoURL, setimgphotoURL] = useState()
  const [userId, setId] = useState(false)
  const [open, setOpen] = useState(false)
  const [groupName, setGroupname] = useState("")
  const [groupTagline, setGroupTagline] = useState("")
  const [adminGroupInfo, setAdminGroupInfo] = useState([])
  const [check, setCheck] = useState(false)
  const [groupMemberList, setGroupMemberList] = useState([])

  let handleModaImg = () => {
    setOpenImg(true)
  }

  const handleClose = () => {
    setOpen(false)
    setOpenImg(false)
  }

  useEffect(() => {
    const groupRef = dbref(db, "groups/")
    onValue(groupRef, (snapshot) => {
      let groupArr = []
      snapshot.forEach((item) => {
        if (auth.currentUser.uid !== item.val().adminid) {
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
  }, [check])

  useEffect(() => {
    const groupRef = dbref(db, "groupmembers")
    onValue(groupRef, (snapshot) => {
      let groupmemberArr = []
      snapshot.forEach((item) => {
        // let groupinfo = {
        //   adminid: item.val().adminid,
        //   adminname: item.val().adminname,
        //   groupname: item.val().groupname,
        //   grouptagline: item.val().grouptagline,
        //   key: item.key,
        // }
        // groupmemberArr.push(groupinfo)

        if (item.val().userid == auth.currentUser.uid) {
          groupmemberArr.push(item.val().groupid)
        }
      })
      setGroupMemberList(groupmemberArr)
    })
  }, [])

  let handleCreateGroup = () => {
    setLoaiding(true)
    const db = getDatabase()
    set(push(dbref(db, "groups/")), {
      groupname: groupName,
      grouptagline: groupTagline,
      adminname: auth.currentUser.displayName,
      adminid: auth.currentUser.uid,
    })
      .then(() => {
        setLoaiding(false)
        setOpenImg(false)
        setCheck(!check)
      })
      .catch((error) => console.log(error))
  }

  let handleGroupJoin = (id, gid, gn, gt) => {
    set(push(dbref(db, "groupjoinrequest")), {
      adminid: id,
      groupid: gid,
      groupname: gn,
      userid: auth.currentUser.uid,
      grouptagline: gt,
      username: auth.currentUser.displayName,
      userprofileimage: auth.currentUser.photoURL,
    })

    set(push(dbref(db, "notifications")), {
      adminid: id,
      groupid: gid,
      groupname: gn,
      grouptagline: gt,
      userid: auth.currentUser.displayName,
      username: auth.currentUser.displayName,
      userprofileimage: auth.currentUser.photoURL,
    })
  }

  return (
    <div className="grouplist">
      <h2>
        Group List
        <div className="buton">
          <Button variant="contained" onClick={handleModaImg}>
            Create group
          </Button>
        </div>
      </h2>

      {adminGroupInfo.map(
        (item) =>
          item.adminid != auth.currentUser.uid && (
            <>
              <div className="box">
                <div className="img">
                  <img src="assets/images/group.jpg" alt="" />
                </div>
                <div className="name">
                  <h4>{item.groupname}</h4>
                  <h5>{item.grouptagline}</h5>
                </div>
                {groupMemberList.indexOf(item.key) == -1 && (
                  <div className="button">
                    <button
                      onClick={() =>
                        handleGroupJoin(
                          item.adminid,
                          item.key,
                          item.groupname,
                          item.grouptagline
                        )
                      }
                    >
                      Join
                    </button>
                  </div>
                )}
              </div>
              <div className="divider"></div>
            </>
          )
      )}

      {adminGroupInfo.length == 0 && (
        <Alert severity="info">No group has created.</Alert>
      )}

      <Modal
        open={openImg}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="leftbarbox">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add group information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modal-input">
              <TextField
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
                onChange={(e) => setGroupname(e.target.value)}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Group Tagline"
                variant="outlined"
                onChange={(e) => setGroupTagline(e.target.value)}
              />
            </div>
            {loading ? (
              <button>Creating...</button>
            ) : (
              <button onClick={handleCreateGroup}>Create Group</button>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default GroupList

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
