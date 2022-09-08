import React, { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const Home = () => {
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        // ...
      } else {
        // User is signed out
        console.log("no user")
      }
    })
  }, [])
  return <div>Home</div>
}

export default Home
