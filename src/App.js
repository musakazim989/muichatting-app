import Registration from "./components/pages/Registration"
import Login from "./components/pages/Login"
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
