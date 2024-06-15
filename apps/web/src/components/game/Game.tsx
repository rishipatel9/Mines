
import {  useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fillUp } from "../../utility/minesIndexSlice.js";
import axios from "axios";
import Navbar from "../ui/Navbar.js";
import Tile from "./Tile.js";
import { selectMinesIndex } from "../../store/selectors.js";
import diamondImage from "../../assets/diamond.jpg";
import minesImage from "../../assets/mines.jpg";
import { isLive } from "../../utility/betSlice.js";


const Game = () => {
    
    const [mines,setMines]=useState(1);
    const history=useNavigate();
    const dispatch=useDispatch();
    const finalMinesIndex=useSelector(selectMinesIndex);

    axios.defaults.withCredentials = true;
    const gridSize = 25; 
    const numbers = Array.from({ length: 24 }, (_, i) => i + 1);
    const tiles = Array.from({ length: 25 }, (_, i) => i + 1);

    const mineIndexUpdateHandler=()=>{
        const mineIndex: number[] = [];
        while (mineIndex.length < mines) {
            const index = Math.floor(Math.random() * gridSize);
            if (!mineIndex.includes(index)) {
                mineIndex.push(index);
            }
        }  
        dispatch(fillUp(mineIndex))
    };
    
    const setBetLive=()=>{
        dispatch(isLive())
    }

    useEffect(()=>{
        const isAuth=async()=>{
            const res=await axios.post('http://localhost:3000/game');
            if(res.status===201){
                history('/');
            }
        }
        isAuth()
    },[])

    const handleOnchange=(event:any)=>{
        setMines(event.target.value)
    }   
    
    return (

        <div className='bg-[#1A2C38] lg:h-[100vh] lg:w-[100vw] md:h-[100vh] md:w-[100vw] sm:h-[100vh] sm:w-[100vw] h-[100vh] w-[100vw] flex justify-center items-center ' >
            <Navbar></Navbar>
            <div className="lg:h-[600px] lg:w-[1000px] lg:mb-0 xl:flex xl:flex-row lg:flex lg:flex-row h-[600px] w-[350px] mb-12 flex flex-col-reverse  bg-[#203844]  rounded-md shadow-xl">
                <div className=" lg:w-[25%] xl:h-[100%] w-[100%] h-[35%] justify-self-end flex flex-col">
                    <div className="border-b-4 border-[#0E222E] p-5  lg:block hidden ">
                        <p className="text-[#00E800] text-4xl text-center lg:block hidden "><b>Get Started</b></p>
                    </div>
                    <div className="p-2">
                        <div className="lg:w-[100%] flex justify-between">
                            <p className="text-left text-xs font-bold text-[#B2BBD3] p-1">Bet Amount</p>
                            <p className="text-left text-xs font-bold text-[#B2BBD3] p-1"> ₹0.00</p>
                        </div>
                        <div className="  lg:w-[100%]  bg-[#304553] p-[1px] rounded-sm flex shadow-md">
                            <input className="bg-[#0E222E]  lg:h-10 lg:w-[60%] md:h-[30px] md:w-[60%] sm:w-[70%] sm:h-[35px] h-8 w-[100%]  outline-[#304553] border border-[#304553] text-white  hover:outline-[#B2BBD3]" type="number" />
                            <div className="lg:w-[20%] sm:w-[14%] w-[20%] flex justify-center items-center text-white text-xs hover:bg-[#B2BBD3] transition-all " >1/2</div>
                            <div className="lg:w-[1px] lg:h-[39px] sm:w-[1%] w-[1%] bg-[#0E222E] "></div>
                            <div className="lg:w-[20%] sm:w-[14%]  w-[20%] flex justify-center items-center text-white  text-xs hover:bg-[#B2BBD3] transition">2X</div>
                        </div>
                    </div>
                    <div className="px-2 ">
                        <p className="text-left text-xs font-bold text-[#B2BBD3] p-1 "> Mines</p> 
                        <select name="cars" id="cars" className="bg-[#0E222E]  lg:h-[43px] lg:w-[100%] md:h-[30px]  md:w-[100%] sm:w-[100%] sm:h-[35px] h-8 w-[100%]  lg:p-2  text-white border- border-[#0E222E] shadow-md " onChange={handleOnchange} value={mines}>
                            {numbers.map(number => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select> 
                    </div>
                    <div className="lg:w-[100%] lg:p-2  pt-4 ">
                        <button className="lg:w-[100%] lg:h-[50px] lg:mx-0 w-[95%] h-[48px] mx-2 rounded-sm font-bold bg-[#00E800]" onClick={()=>{
                            mineIndexUpdateHandler()
                            setBetLive()
                        }}>Bet</button>
                    </div>
                </div>
                <div className="lg:w-[75%] lg:h-[100%]   md:h-[410px] h-[390px] p-1 bg-[#0E222E] shadow-md flex justify-center lg:p-2">
                    <div className="grid xl:w-[80%] md:h-[100%] lg:w-[80%] 2xl:w-[84%] lg:m-0 pb-0  w-[100%] h-[90%]  grid-rows-5 grid-cols-5   place-items-center ">
                        {tiles.map((_,index)=>(
                            // finalMinesIndex.includes(index) ? <Tile key={index} image={diamondImage}/>: <Tile key={index} image={minesImage} />
                            <Tile key={index} image={finalMinesIndex.minesIndex.includes(index) ?  diamondImage :minesImage} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Game
