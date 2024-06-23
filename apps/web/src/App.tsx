import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./components/game/Game.js";
import Bets from "./components/Bets/Bets.js";
import Login from "./components/login/Login.js";
import { SkeletonTheme } from "react-loading-skeleton";


function App() {
  return (
    <SkeletonTheme baseColor="#0E222E" highlightColor="#203844">
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<Game/>} />
          <Route path="/" element={<Login/>}/>
          <Route path="/leaderboard" element={<Bets/>}/>
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  )
}

export default App
