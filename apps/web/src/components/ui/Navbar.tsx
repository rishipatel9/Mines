
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  selectCash, } from "../../store/selectors.js";
import {  useDispatch, useSelector } from "react-redux";
import { toFalse } from "../../utility/betSlice.js";
import { resetClicks } from "../../utility/tileSlice.js";
import { displayNone } from "../../utility/displayAns.js";
import { updatePayout } from "../../utility/payout.js";
import { updateBetAmount } from "../../utility/betAmount.js";
import User from "../User.js";


const Navbar = () => {
  axios.defaults.withCredentials=true;


  const balance=useSelector(selectCash);


  return (
    <div className="2xl:h-12 lg:h-16 w-screen md:h-16  h-12 bg-[#203844] absolute top-0 flex justify-center shadow-md" >
      <div className="lg:w-[1000px] w-[350px] lg:pt-4  flex justify-between items-center p-3">
        <div className="text-[#00E800] text-2xl font-bold ">Mines</div>
        <div className="text-white bg-[#0E222E] lg:h-[40px]  lg:text-2xl  px-[10%] font-extrabold rounded-sm p-1 shadow-md  ">₹{balance}</div>
        <div className="text-white ">
          <User></User>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
