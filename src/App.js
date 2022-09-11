import React, { Component } from "react"
import { Routes, Route } from "react-router-dom"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import Home from "./pages/Home"
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
