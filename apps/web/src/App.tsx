import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./components/game/Game.js";
import Bets from "./components/Bets/Bets.js";
import Login from "./components/login/Login.js";
import { SkeletonTheme } from "react-loading-skeleton";
import Leaderboard from "./components/leaderboard/Leaderboard.js";


function App() {
  return (
    <SkeletonTheme baseColor="#0E222E" highlightColor="#203844">
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<Game/>} />
          <Route path="/" element={<Login/>}/>
          <Route path="/bets" element={<Bets/>}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  )
}

export default App
