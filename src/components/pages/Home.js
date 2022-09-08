import React, { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"

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
      <h1>Home</h1>
    </>
  )
}

export default Home
