import React, { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { Grid } from "@mui/material"

const Home = () => {
  const auth = getAuth()
  const [emailVerify, setemailVerify] = useState(false)

  const navigate = useNavigate()

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
          left
        </Grid>
        <Grid item xs={4}>
          next left
        </Grid>
        <Grid item xs={3}>
          next right
        </Grid>
        <Grid item xs={3}>
          right
        </Grid>
      </Grid>
    </>
  )
}

export default Home
