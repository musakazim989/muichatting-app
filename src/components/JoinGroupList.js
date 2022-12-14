import React, { useEffect, useState } from "react"
import {
  Button,
  Modal,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Alert,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material"
import { BiMessageAltDetail } from "react-icons/bi"
import { MdGroups } from "react-icons/md"
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
  const dispatch = useDispatch()

  const [adminGroupInfo, setAdminGroupInfo] = useState([])
  const [open, setOpen] = useState(false)
  const [groupMemberList, setGroupMemeberList] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setOpenModal(false)
  }

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
    dispatch(activeChat(userinfo))
  }

  let handleGroupMemberShow = (id) => {
    setOpenModal(true)

    const groupRef = dbref(db, "groupmembers/")
    onValue(groupRef, (snapshot) => {
      let groupArr = []
      snapshot.forEach((item) => {
        if (id == item.val().groupid) {
          let groupinfo = {
            key: item.key,
            adminid: item.val().adminid,
            groupid: item.val().adminid,
            userid: item.val().userid,
            username: item.val().username,
          }
          groupArr.push(groupinfo)
        }
      })
      setGroupMemeberList(groupArr)
    })
  }

  return (
    <div className="grouplist joingroup">
      <h2>Joind Group</h2>
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
                <button style={{ marginRight: "10px" }}>
                  <BiMessageAltDetail />
                </button>

                <button onClick={() => handleGroupMemberShow(item.key)}>
                  <MdGroups />
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

            {/* {groupInfo.length == 0 && (
              <Alert severity="info">No group join request found.</Alert>
            )} */}

            <>
              <div className="modal-box">
                <div className="box mymodal">
                  <div className="img">
                    {/* <img src={item.userprofileimage} alt="" /> */}
                  </div>
                  <div className="name">
                    <h4>sdgdsg</h4>
                    <h5>
                      263646464
                      <span style={{ width: "100px" }}>
                        - wants to join the group
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </>
          </Box>
        </Modal>
        <div>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h1>Total member: {groupMemberList.length}</h1>
              {groupMemberList.map((item, index) => (
                <List
                  key="index"
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {console.log(item)}
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          ></Typography>
                          {item.username}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ))}
            </Box>
          </Modal>
        </div>
      </>
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

export default JoinGroupList
