import React, { Component, useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import ResetPassword from "./components/ResetPassword"
import Message from "./pages/Message"
function App() {
  const auth = getAuth()
  const [dl, setDl] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
  }, [])

  let handleDlMode = () => {
    setDl(!dl)
    console.log(dl)
  }

  return (
    <>
      <div className={dl ? "dark" : "light"}>
        {show && (
          <div className="dlmode" onClick={handleDlMode}>
            {dl ? (
              <>
                <p className="sw-text">Switch Light: </p>
                <span className="on">
                  <MdOutlineDarkMode />
                </span>
              </>
            ) : (
              <>
                <p className="sw-text">Switch Dark: </p>
                <span className="off">
                  <MdDarkMode />
                </span>
              </>
            )}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </div>
    </>
  )
}

let dark = {
  background: "#0e0f26",
}
let light = {
  background: "#fff",
}

export default App
