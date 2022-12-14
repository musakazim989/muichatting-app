import React, { useEffect, useState } from "react"
import {
  Grid,
  TextField,
  Button,
  Alert,
  IconButton,
  Box,
  Collapse,
} from "@mui/material"
import { MdClose } from "react-icons/md"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth"

const Login = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  let navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailerror, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passErrdigits, setpassErrdigits] = useState("")
  const [checkPass, setCheckPass] = useState(false)
  const [emailVerify, setEmailVerify] = useState("")
  const [emailErrMsg, setEmailErrMsg] = useState("")
  const [passwordErrMsg, setPasswordErrMsg] = useState("")
  const [open, setOpen] = useState(true)
  const [mssg, setMssg] = useState("")

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
              navigate("/home")
            }
          })
        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code
          if (errorCode.includes("user-not-found")) {
            setEmailErrMsg("User not found.")
          } else if (errorCode.includes("password")) {
            setPasswordErrMsg("Wrong password.")
          }
        })
    }
  }

  let handleGoogleSignin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result)
        // const token = credential.accessToken
        // // The signed-in user info.
        // const user = result.user
        // // ...
        navigate("/home")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  let handleFacebookSignin = () => {
    const provider = new FacebookAuthProvider()
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/home")
      })
      .catch((error) => {
        const errorCode = error.code
      })
  }

  useEffect(() => {
    if (location.state !== null) {
      setMssg(location.state.msg)
      setOpen(true)
    }
  }, [])

  return (
    <section className="registraion-part login-part">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="box">
            <div className="left">
              <h2>Get Started with registration.</h2>
              <p>Welcome : )</p>
              {location.state && (
                <Box sx={{ width: "100%", marginTop: "20px" }}>
                  <Collapse in={open}>
                    <Alert
                      severity="warning"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false)
                          }}
                        >
                          <MdClose fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      {mssg}
                      {/* {location.state.msg} */}
                    </Alert>
                  </Collapse>
                </Box>

                // <Alert
                //   severity="warning"
                //   style={{ width: "355px", marginTop: "20px" }}
                // >
                //   {location.state.msg}
                // </Alert>
              )}
              <div className="loginoption">
                <div className="option" onClick={handleGoogleSignin}>
                  <FcGoogle className="option-icon google" /> Login with Google
                </div>
                <div className="option" onClick={handleFacebookSignin}>
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
              ) : emailErrMsg ? (
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
              <br />
              <p className="form-bottom-text p" style={{ marginTop: "5px" }}>
                Froget password?{" "}
                <Link to="/resetpassword" className="a">
                  Click here.
                </Link>
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="log-img">
            <img src="./assets/images/login.jpg" alt="" />
          </div>
        </Grid>
      </Grid>
    </section>
  )
}

export default Login
