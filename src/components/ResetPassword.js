import React, { useState } from "react"
import { TextField, Button } from "@mui/material"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const ResetPassword = () => {
  const auth = getAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState()

  let handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/login")

        console.log("email send")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        console.log(errorCode)
        // ..
      })
  }
  return (
    <div className="forgotpassword">
      <div className="box">
        <h2>Reset Passowrd</h2>
        <div className="forgot">
          <h2>Forgot Password</h2>
          <p>Enter your registered email.</p>
          <TextField
            id="outlined-basic"
            label="Enter Email"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={handlePasswordReset}
            style={{ width: "100%", marginTop: "30px" }}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
