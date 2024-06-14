import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./components/game/Game.js";
import Login from "./components/login/Login.js";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<Game/>} />
        <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
