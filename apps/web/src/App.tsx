import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./components/game/Game.js";
import LeaderBoard from "./components/leaderboard/LeaderBoard.js";
import Login from "./components/login/Login.js";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<Game/>} />
        <Route path="/" element={<Login/>}/>
        <Route path="/leaderboard" element={<LeaderBoard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
