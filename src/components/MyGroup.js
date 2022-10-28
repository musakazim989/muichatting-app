import React, { useState, useEffect } from "react"
import { Button, Alert, Modal, Typography, Box } from "@mui/material"
import { getDatabase, ref, onValue } from "firebase/database"
import { getAuth, updateProfile } from "firebase/auth"

const MyGroup = () => {
  const auth = getAuth()
  const [adminGroupInfo, setAdminGroupInfo] = useState([])
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  return (
    <div className="grouplist friendlist mygroup">
      <h2>My Group</h2>
      {adminGroupInfo.map(
        (item) =>
          item.adminid == auth.currentUser.uid && (
            <>
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
                    <button onClick={handleOpen} variant="contained">
                      Info
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
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
