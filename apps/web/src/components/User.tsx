import { updateBetAmount } from '../utility/betAmount.js';
import { toFalse } from '../utility/betSlice.js';
import { displayNone } from '../utility/displayAns.js';
import { updatePayout } from '../utility/payout.js';
import { resetClicks } from '../utility/tileSlice.js';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profile from "../assets/user.png";

const User = () => {
    const [showMenu, setShowMenu] = useState<Boolean>(false);
    const dispatch = useDispatch();
    const history=useNavigate();
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };


    const removeCookie = async () => {
        try {
            await axios.get("http://localhost:3000/clear-cookie", {
                withCredentials: true,
            });
            dispatch(updatePayout(0))
            dispatch(updateBetAmount(0))
            dispatch(displayNone())
            dispatch(resetClicks());
            dispatch(toFalse())
            history("/");
        } catch (error) {
            console.error(error);
        }
    };

    const redirectBets=()=>{
        setShowMenu(false)
        history('/bets')
    }

    return (
        <div className="relative z-10">
            <button
                className="lg:h-[50px] lg:w-[50px] md:h-[50px]  md:w-[50px] h-[40px] w-[40px] rounded-[50%] focus:outline-none"
                onClick={toggleMenu}
            >
                <img src={profile} className="w-[100%] h-[100%] rounded-[50%]" alt="" />
            </button>
            {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#203844]  rounded-md shadow-lg">
                    <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-sm text-[#B2BBD3] hover:bg-[#0E222E]" onClick={redirectBets}>Recent Bets</a>
                        <a href="#" className="block px-4 py-2 text-sm text-[#B2BBD3] hover:bg-[#0E222E]" onClick={()=>{
                            setShowMenu(false)
                            history('/leaderboard')
                        }}>Leaderboard</a>
                        <a href="#" className="block px-4 py-2 text-sm text-[#00E800] hover:bg-[#0E222E]" onClick={()=>{
                            setShowMenu(false)
                            history('/game')}}>Game</a>
        
                        <a href="#" className="block px-4 py-2 text-sm text-[#B2BBD3] bg-[#F44336] hover:bg-[#0E222E]" onClick={removeCookie}>Sign out</a>

                    </div>
                </div>
            )}
        </div>
    );
};
  {/* <button className="bg-[#F44336] font-bold lg:p-2 rounded-sm border p-1 border-white shadow-md" onClick={removeCookie}>Logout</button> */}

export default User;
