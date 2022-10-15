import React, { useEffect, useState } from "react"
import { Grid } from "@mui/material"
import Leftbar from "../components/Leftbar"
import Search from "../components/Search"
import FriendRequest from "../components/FriendRequest"
import Friends from "../components/Friends"
import Userlist from "../components/Userlist"
import MyGroup from "../components/MyGroup"
import BlockUser from "../components/BlockUser"
import JoinGroupList from "../components/JoinGroupList"

const Message = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Leftbar active="msg" />
      </Grid>
      <Grid item xs={4}>
        <Search />
        <JoinGroupList />
        <Friends item="button" />
      </Grid>
      <Grid item xs={6}>
        <Friends />
      </Grid>
    </Grid>
  )
}

export default Message
