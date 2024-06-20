
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { selectBet, selectBetAmount } from "../../store/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import { updateCash } from "../../utility/cash.js";

const Navbar = () => {

  axios.defaults.withCredentials=true;
  const history = useNavigate();
  const [balance, setBalance] = useState(0);
  const isBetLive=useSelector(selectBet)
  const dispatch=useDispatch();
  const getBalance = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/get-balance', {
        withCredentials: true,
      });       
      const {balance}=response.data;
      setBalance(balance);
      dispatch(updateCash(balance))
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    getBalance()
  },[isBetLive.bet])

  const removeCookie = async () => {
    try {
      await axios.get("http://localhost:3000/clear-cookie", {
        withCredentials: true,
      });
      history("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="2xl:h-12 lg:h-16 w-screen md:h-16  h-12 bg-[#203844] absolute top-0 flex justify-center shadow-md" >
      <div className="lg:w-[1000px] w-[350px] lg:pt-4  flex justify-between items-center p-3">
        <div className="text-[#00E800] text-2xl font-bold ">Mines</div>
        {/* <div className="text-white bg-[#0E222E] lg:pt-1 lg:mb-2 lg:text-2xl  px-[10%] mb-2 font-extrabold mt-1">1000</div> */}
        <div className="text-white bg-[#0E222E]  lg:text-2xl  px-[10%] font-extrabold rounded-sm p-1 shadow-md ">{balance}</div>
        <div className="text-white ">
          <button className="bg-[#F44336] font-bold lg:p-2 rounded-sm border p-1 border-white shadow-md" onClick={removeCookie}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
