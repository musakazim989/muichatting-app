import React, { useState } from "react"
import { Grid, TextField, Button, Alert } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailerror, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passErrdigits, setpassErrdigits] = useState("")
  const [checkPass, setCheckPass] = useState(false)
  const [emailVerify, setEmailVerify] = useState("")
  const [passErrMsg, setpassErrMsg] = useState("")
  const [passmatcherr, setPassmatcherr] = useState("")
  const [emailErrMsg, setEmailErrMsg] = useState("")
  const [passwordErrMsg, setPasswordErrMsg] = useState("")

  const auth = getAuth()
  let navigate = useNavigate()

  let handleCheckPass = () => {
    setCheckPass(!checkPass)
  }

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
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          onAuthStateChanged(auth, (user) => {
            if (user.emailVerified === false) {
              setEmailVerify("Please check your email for verification.")
            } else {
              const uid = user.uid
              console.log(uid)
              console.log(userCredential)
              navigate("/home")
            }
          })
        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code
          if (errorCode.includes("user")) {
            setEmailErrMsg("User not found.")
          } else if (errorCode.includes("password")) {
            setPasswordErrMsg("Wrong password.")
          }
        })
    }
  }

  return (
    <section className="registraion-part login-part">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="box">
            <div className="left">
              <h2>Get Started with registration.</h2>
              <p>Welcome : )</p>
              <div className="loginoption">
                <div className="option">
                  {" "}
                  <FcGoogle className="option-icon google" /> Login with Google
                </div>
                <div className="option">
                  <FaFacebook className="option-icon facebook" />
                  Login with Facebook
                </div>
              </div>
              {emailVerify ? (
                <Alert
                  severity="error"
                  style={{ width: "355px", marginTop: "20px" }}
                >
                  {emailVerify}
                </Alert>
              ) : passwordErrMsg ? (
                <Alert
                  severity="error"
                  style={{ width: "355px", marginTop: "20px" }}
                >
                  {passwordErrMsg}
                </Alert>
              ) : (
                ""
              )}

              <TextField
                style={{ width: "355px", marginTop: "20px" }}
                helperText={emailerror}
                id="demo-helper-text-misaligned"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <div className="eye">
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
                  type={checkPass ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {checkPass ? (
                  <VscEye onClick={handleCheckPass} className="eyeicon" />
                ) : (
                  <VscEyeClosed onClick={handleCheckPass} className="eyeicon" />
                )}
              </div>
              <br />
              <Button
                style={{ width: "355px", marginTop: "30px" }}
                variant="contained"
                onClick={handleSubmit}
              >
                Log in to continue
              </Button>
              <br />
              <span className="form-bottom-text" style={{ marginTop: "25px" }}>
                Don't have an account? <Link to="/"> Sign Up </Link> here.
              </span>
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
