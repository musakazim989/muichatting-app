import React, { useState } from "react"
import { Grid, TextField, Button, Alert } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { getDatabase, ref, set } from "firebase/database"
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth"

const Registration = () => {
  const auth = getAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nameerror, setNameError] = useState("")
  const [emailerror, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [passErrdigits, setpassErrdigits] = useState("")
  const [passmatcherr, setPassmatcherr] = useState("")
  const [emailErrMsg, setEmailErrMsg] = useState("")

  let navigate = useNavigate()

  let handleSubmit = () => {
    const db = getDatabase()

    if (!name) {
      setNameError("Please enter your name")
    } else if (!email) {
      setEmailError("Please enter email")
      setNameError("")
    } else if (!password) {
      setPasswordError("Please enter password")
      setEmailError("")
    } else if (password.length < 8) {
      setpassErrdigits("Password should be 8 characters")
      setPasswordError("")
    } else if (!confirmPassword) {
      setConfirmPasswordError("Please enter confirm password")
      setpassErrdigits("")
    } else if (password !== confirmPassword) {
      setPassmatcherr("Password dosen't match.")
      setConfirmPasswordError("")
    } else {
      setPassmatcherr("")
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: name,
              // photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
              .then(() => {
                console.log("name set")
                set(ref(db, "users/" + auth.currentUser.uid), {
                  username: name,
                  email: email,
                  // profile_picture : imageUrl
                })
              })
              .catch((error) => {
                console.log("nameset", error)
              })

            console.log("Email Send")
            navigate("/login")
          })
        })
        .catch((error) => {
          const errorCode = error.code
          console.log(errorCode)
          if (errorCode.includes("email-already-in-use")) {
            setEmailErrMsg("Email already used, please use another email.")
          } else if (errorCode.includes("invalid-email")) {
            setEmailErrMsg("invalid-email")
          }
        })
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
              {emailErrMsg ? (
                <Alert
                  severity="error"
                  style={{ width: "355px", marginTop: "20px" }}
                >
                  {emailErrMsg}
                </Alert>
              ) : (
                ""
              )}
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
                helperText={
                  confirmPasswordError
                    ? confirmPasswordError
                    : passmatcherr
                    ? passmatcherr
                    : ""
                }
                id="demo-helper-text-misaligned"
                label="Confirm Password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br />
              <Button
                style={{ width: "355px", marginTop: "30px" }}
                variant="contained"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <br />
              <span className="form-bottom-text" style={{ marginTop: "15px" }}>
                Have an account? <Link to="/login"> Log In </Link> here.
              </span>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="reg-img">
            <img src="./assets/images/reg.jpg" alt="" />
          </div>
        </Grid>
      </Grid>
    </section>
  )
}

export default Registration
