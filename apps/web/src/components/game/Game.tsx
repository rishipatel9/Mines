
import { useEffect, useState } from "react";
import { selectBet, selectBetAmount, selectCash, selectDiamondCount, selectDisplayAll, selectMinesIndex, selectMultiplier, selectPayout } from "../../store/selectors.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fillUp } from "../../utility/minesIndexSlice.js";
import { isLive, toFalse } from "../../utility/betSlice.js";
import { displayAll, displayNone } from "../../utility/displayAns.js";
import { updateBetAmount } from "../../utility/betAmount.js";
import { setDiamondCount } from "../../utility/diamondCount.js";
import { resetClicks } from "../../utility/tileSlice.js";
import axios from "axios";
import Tile from "./Tile.js";
import Navbar from "../ui/Navbar.js";
import diamondImage from "../../assets/diamond.jpg";
import minesImage from "../../assets/mines.jpg";
import bombIcon from "../../assets/round-bomb.png";
import diamondIcon from "../../assets/diamond.png";
import { updatePayout } from "../../utility/payout.js";
import { updateCash } from "../../utility/cash.js";
import { updateMultiplier } from "../../utility/multiplier.js";


const Game = () => {

    const [mines, setMines] = useState(1);
    const [invalidAmount, setInvalidAmount] = useState<Boolean>(false);
    const [details1, setDetails1] = useState<Number>(0);
    const [details2, setDetails2] = useState<Number>(0);
    const setDisplayAll = useSelector(selectDisplayAll)
    const history = useNavigate();
    const dispatch = useDispatch();
    const finalMinesIndex = useSelector(selectMinesIndex);
    const isBetLive = useSelector(selectBet)
    const diamondCount = useSelector(selectDiamondCount)
    const multiplier = useSelector(selectMultiplier);
    const betAmount = useSelector(selectBetAmount);
    const cash = useSelector(selectCash);
    const payout = useSelector(selectPayout);
    const [displayCashout, setDisplayCashout] = useState(false);


    axios.defaults.withCredentials = true;

    const gridSize = 25;
    const numbers = Array.from({ length: 24 }, (_, i) => i + 1);
    const tiles = Array.from({ length: 25 }, (_, i) => i + 1);

    const mineIndexUpdateHandler = () => {
        if (betAmount === 0) {
            console.log(0);
            setInvalidAmount(true);
            return;
        }
        dispatch(setDiamondCount(25 - mines));
        const mineIndex: number[] = [];
        while (mineIndex.length < mines) {
            const index = Math.floor(Math.random() * gridSize);
            if (!mineIndex.includes(index)) {
                mineIndex.push(index);
            }
        }
        for (let i = 0; i < mineIndex.length; i++) {
            if (!mineIndex.includes(i)) {
            }
        }
        dispatch(fillUp(mineIndex))
    };

    const updateBalance = async (url: string, data: any) => {
        try {
            const response = await axios.post(url, data);
            console.log(`Response from ${url}:`, response.data);
            dispatch(updateCash(response.data.balance))
            console.log("balance updated", response.data.balance);
        } catch (error) {
            console.error(`Error updating balance at ${url}:`, error);
        }
    };

    const getBalance = async () => {
        try {
            const response = await axios.post('http://localhost:3000/user/get-balance');
            dispatch(updateCash(response.data.balance));
        } catch (error) {
            console.error('Error getting balance:', error); // Debug log
        }
    };

    function setBetLive() {
        getBalance();
        if (betAmount === 0) {
            console.log(0);
            setInvalidAmount(true);
            return;
        }
        if (parseInt(betAmount) > parseInt(cash)) {
            console.log("false amount", parseInt(betAmount) > parseInt(cash));
            setInvalidAmount(true);
            return;
        }

        if (isBetLive.bet && !setDisplayAll.display) {
            dispatch(updatePayout(multiplier * betAmount));
            setDetails1(multiplier);
            setDetails2(payout);
        }
        if (isBetLive.bet === true) {
            getBalance();
            dispatch(updatePayout(0));
            dispatch(updateBetAmount(0));
            dispatch(displayNone());
            dispatch(resetClicks());
            dispatch(toFalse());
            return;
        }
        if (!isBetLive.bet) {
            dispatch(displayNone());
            dispatch(resetClicks());

        }

        setInvalidAmount(false);
        dispatch(isLive());
        setDisplayCashout(false);
        updateBalance('http://localhost:3000/user/update-balance', { cash: betAmount });

    }

    useEffect(() => {
        getBalance();
    }, [isBetLive.bet, mines]);

    useEffect(() => {
        const isAuth = async () => {
            const res = await axios.post('http://localhost:3000/game');
            if (res.status === 201) {
                history('/');
            }
        }
        isAuth()
    }, [])

    const handleOnchange = (event: any) => {
        setMines(event.target.value)
    }

    const handleBetAmountChange = (event: any) => {
        let value = event.target.value;
        // value = event.target.value.replace(/^0+/, '');
        dispatch(updateBetAmount(parseInt(value, 10)));
    };

    useEffect(() => {
        dispatch(updatePayout((multiplier * betAmount).toFixed(2)));
    }, [multiplier, betAmount, dispatch]);

    const handle = async () => {
        updateBalance('http://localhost:3000/user/update-payout',
            {
                payout: payout,
                multiplier: multiplier,
                betAmount: betAmount,
            });
        getBalance();
    }

    const handleCashout = () => {
        if (multiplier === 0) return
        try {
            dispatch(displayAll());
            setDetails1(multiplier)
            setDetails2(payout)
            setDisplayCashout(true)
            handle()
            dispatch(updateMultiplier(0));
            dispatch(updatePayout(0));
            dispatch(updateBetAmount(0));
            dispatch(toFalse());
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className='bg-[#1A2C38] lg:h-[100vh] lg:w-[100vw] md:h-[100vh] md:w-[100vw] sm:h-[100vh] sm:w-[100vw] h-[100vh] w-[100vw] flex justify-center items-center ' >
            <Navbar></Navbar>
            <div className={`lg:h-[600px] lg:w-[1000px] lg:mb-0 xl:flex xl:flex-row lg:flex lg:flex-row  ${isBetLive.bet ? "h-auto " : "h-[553px]"}  w-[350px] mt-10 flex flex-col-reverse  bg-[#203844]  rounded-md shadow-custom `}>
                <div className=" lg:w-[25%] xl:h-[100%] w-[100%] h-[35%] justify-self-end flex flex-col">
                    <div className="border-b-4 border-[#0E222E] p-5  lg:block hidden ">
                        <p className="text-[#00E800] text-4xl text-center lg:block hidden "><b>Get Started</b></p>
                    </div>
                    <div className="lg:p-2 px-2">
                        <div className="lg:w-[100%] flex justify-between">
                            <p className="text-left text-sm font-bold text-[#B2BBD3] p-1">Bet Amount</p>
                            {/* <p className="text-left text-sm font-bold text-[#B2BBD3] p-1"> ₹0.00</p> */}
                        {invalidAmount &&
                            <p className="text-red-500">Invalid Amount</p>
                        }
                        </div>
                        <div className="  lg:w-[100%] bg-[#304553] p-[1px] rounded-sm flex shadow-md">
                            <input className="bg-[#0E222E]  lg:h-10 lg:w-[60%] lg:pl-2 md:h-[30px] md:w-[60%] pl-2 sm:w-[70%]  h-8 w-[100%]  outline-[#304553] border border-[#304553] text-white  hover:outline-[#B2BBD3] input focus:outline-none font-bold" placeholder="0.00" onChange={handleBetAmountChange} value={betAmount} readOnly={isBetLive.bet} type="number" />
                            <div className="lg:w-[20%] md:w-[20%] sm:w-[14%] w-[20%] flex justify-center items-center text-white text-xs hover:bg-[#B2BBD3] transition-all" onClick={() => dispatch(updateBetAmount((betAmount / 2).toFixed(2)))} >1/2</div>
                            <div className="lg:w-[1px] lg:h-[39px] sm:w-[1%] w-[1%] bg-[#0E222E] "></div>
                            <div className="lg:w-[20%] md:w-[20%] sm:w-[14%]  w-[20%] flex justify-center items-center text-white  text-xs hover:bg-[#B2BBD3] transition" onClick={() => dispatch(updateBetAmount((betAmount * 2).toFixed(2)))}>2X</div>
                        </div>
                    </div>
                    {!isBetLive.bet && <div className="lg:px-2 px-2 ">
                        <p className="text-left text-sm font-bold text-[#B2BBD3] p-1 "> Mines</p>
                        <select name="cars" id="cars" className="bg-[#0E222E]  lg:h-[43px] lg:w-[100%] md:h-[30px]  md:w-[100%] sm:w-[100%] sm:h-[35px] h-8 w-[100%]  lg:p-2  text-white border- border-[#0E222E] shadow-md " onChange={handleOnchange} value={mines}>
                            {numbers.map(number => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select>
                    </div>}
                    {isBetLive.bet &&
                        <div className="lg:w-[100%] lg:h-auto lg:px-2 lg:pb-1 md:px-2 w-[100%] h-auto px-2 py-1 lg:flex flex">
                            <div className="lg:w-[100%] lg:h-auto pr-3  md:w-[50%] md:h-auto w-[50%] h-16  text-[#B2BBD3] text-sm font-bold ">
                                <p className="text-[#B2BBD3] text-sm font-bold py-1">Mines</p>
                                <div className="lg:w-[97%] lg:h-10  md:h-[35px] md:w-[100%] h-10  bg-[#2D4453] shadow-custom rounded-sm flex justify-between items-center  px-2  text-white "><div>{mines}</div><div><img src={bombIcon} alt="" /></div></div>
                            </div>
                            <div className="lg:w-[100%] lg:h-auto pl-1 md:w-[50%] md:h-auto w-[50%] h-16   text-[#B2BBD3] text-sm font-bold ">
                                <p className="text-[#B2BBD3] text-sm font-bold py-1">Gems</p>
                                <div className="lg:w-[97%] lg:h-10 md:h-[35px]  md:w-[100%] h-10  bg-[#2D4453] shadow-custom rounded-sm flex  justify-between items-center px-2  text-white "><div>{diamondCount}</div><div><img src={diamondIcon} alt="" /></div></div>
                            </div>
                        </div>
                    }
                    {isBetLive.bet &&
                        <div className="lg:w-[100%] lg:h-auto  lg:px-2 lg:py-2  md:px-2 w-[100%] h-auto px-2 lg:flex-col">
                            <p className="text-[#B2BBD3] text-sm font-bold py-1">Total Profit {multiplier}</p>
                            <div className="lg:w-[98%] lg:h-11 md:h-[35px] h-10 bg-[#2D4453] shadow-custom  flex justify-start items-center px-2 text-white font-bold">{payout}</div>
                        </div>
                    }
                    <div className={`lg:w-[100%] lg:p-2 lg:py-4 md:pb-2  pt-3   `}>
                        {!isBetLive.bet && <button className={`lg:w-[100%] lg:h-[50px] lg:mx-0 w-[95%] h-[48px] mx-2 rounded-sm font-bold bg-[#00E800]  `} onClick={() => {
                            mineIndexUpdateHandler()
                            setBetLive()
                        }}>Bet</button>}
                        {isBetLive.bet && <button className="lg:w-[100%] lg:h-[50px] lg:mx-0 w-[95%] h-[48px] mx-2 rounded-sm font-bold bg-[#00E800]  " onClick={handleCashout} >Cashout</button>}
                    </div>
                </div>
                <div className="lg:w-[75%] lg:h-[100%]   md:h-[365px] h-[360px] p-1 bg-[#0E222E] shadow-md flex justify-center lg:p-2 ">
                    <div className="grid xl:w-[80%] md:h-[100%] lg:w-[80%] 2xl:w-[84%] lg:m-0 pb-0  w-[100%] h-[100%]  grid-rows-5 grid-cols-5   place-items-center  relative">
                        {tiles.map((_, index) => (
                            <Tile key={index} image={finalMinesIndex.minesIndex.includes(index) ? diamondImage : minesImage} index={index} />
                        ))}
                        {displayCashout && <div className='absolute inset-0 bg-black opacity-25'></div>}

                        {displayCashout &&
                            <div className="lg:h-[110px] lg:w-[160px] md:h-[80px] md:w-[120px] h-[70px] w-[110px] absolute bg-[#203844] top-[40%] flex flex-col justify-center items-center border-2 lg:gap-2 md:gap-1 gap-1 border-[#00E800] rounded-sm cashoutAnimation 1s ease-in-out infinite shadow-custom">
                                <div className="text-center text-[#00E800] font-extrabold lg:text-3xl md:text-2xl text-xl   ">{details1.toString()}X</div>
                                <div className="border-t-2 lg:w-[15%] lg:h-[1px] md:h-[1px] md:w-[20px] text-[#B2BBD3]  w-[15px] "></div>
                                <div className=" text-center text-[#00E800] lg:text-sm font-bold text-xs  ">₹{details2.toString()}</div>
                            </div>
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Game
