import React, { Component } from "react"
import ReactDOM from "react-dom/client"
import firebaseConfig from "./FirebaseConfig"
import "./style.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
