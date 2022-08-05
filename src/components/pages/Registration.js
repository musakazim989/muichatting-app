import React, { useState } from "react"
import { Grid, TextField, Button } from "@mui/material"
import { click } from "@testing-library/user-event/dist/click"

const Registration = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nameerror, setNameError] = useState("")
  const [emailerror, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [passErrdigits, setpassErrdigits] = useState("")

  let handleSubmit = () => {
    if (!name) {
      setNameError("Please enter your name")
    } else if (!email) {
      setEmailError("Please enter email")
      setNameError("")
    } else if (!password) {
      setPasswordError("Please enter password")
      setEmailError("")
    } else if (!password.length < 8) {
      setpassErrdigits("Password should be 8 characters")
      setPasswordError("")
    } else if (!confirmPassword) {
      setConfirmPasswordError("Please enter confirm password")
      setpassErrdigits("")
    }
  }

  return (
    <section className="registraion-part">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="box">
            <div className="left">
              <h2>Get Started with registration.</h2>
              <p>Join free!</p>
              <TextField
                style={{ width: "355px", marginTop: "30px" }}
                helperText={nameerror}
                id="demo-helper-text-misaligned"
                label="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <TextField
                style={{ width: "355px", marginTop: "20px" }}
                helperText={emailerror}
                id="demo-helper-text-misaligned"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <TextField
                style={{ width: "355px", marginTop: "20px" }}
                helperText={
                  passwordError
                    ? passwordError
                    : passErrdigits
                    ? passErrdigits
                    : ""
                }
                id="demo-helper-text-misaligned"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <TextField
                style={{ width: "355px", marginTop: "20px" }}
                helperText={confirmPasswordError}
                id="demo-helper-text-misaligned"
                label="Confirm Password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br />
              <Button
                style={{ width: "355px", marginTop: "20px" }}
                variant="contained"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img
            style={{ width: "100%", height: "100vh" }}
            src="./assets/images/reg.jpg"
            alt=""
          />
        </Grid>
      </Grid>
    </section>
  )
}

export default Registration
