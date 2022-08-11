import React, { useState } from "react"
import { Grid, TextField, Button } from "@mui/material"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailerror, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passErrdigits, setpassErrdigits] = useState("")

  let handleSubmit = () => {
    if (!email) {
      setEmailError("Please enter email")
    } else if (!password) {
      setPasswordError("Please enter password")
      setEmailError("")
    } else if (password.length < 8) {
      setpassErrdigits("Password should be 8 characters")
      setPasswordError("")
    } else {
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
              <Button
                style={{ width: "355px", marginTop: "20px" }}
                variant="contained"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <br />
              <p style={{ marginTop: "15px" }}>
                Don't have an account?
                <Link to="/registration"> Sign Up</Link>
                here.
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img
            style={{ width: "100%", height: "100vh" }}
            src="./assets/images/login.jpg"
            alt=""
          />
        </Grid>
      </Grid>
    </section>
  )
}

export default Login
