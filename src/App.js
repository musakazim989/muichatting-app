import React, { Component } from "react"
import { Routes, Route } from "react-router-dom"
import Registration from "./components/pages/Registration"
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
