import React, { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { Grid } from "@mui/material"
import Leftbar from "../components/Leftbar"
import Search from "../components/Search"
import GroupList from "../components/GroupList"
import FriendRequest from "../components/FriendRequest"
import Friends from "../components/Friends"
import Userlist from "../components/Userlist"

const Home = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [emailVerify, setemailVerify] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setemailVerify(user.emailVerified)
      } else {
        console.log("no user")
        navigate("/login")
      }
    })
  }, [])
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Leftbar active="home" />
        </Grid>
        <Grid item xs={4}>
          <Search />
          <GroupList />
          <FriendRequest />
        </Grid>
        <Grid item xs={3}>
          <Friends />
        </Grid>
        <Grid item xs={3}>
          <Userlist />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
