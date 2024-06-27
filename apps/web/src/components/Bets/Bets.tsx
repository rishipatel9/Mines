import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Navbar from "../ui/Navbar.js";
const Bets = () => {

  axios.defaults.withCredentials = true;
  const [bets, setBets] = useState<number[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [nobets,setNobets]=useState<Boolean>(false);
  const BASE_URL =import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const isAuth = async () => {
      const res = await axios.post(`${BASE_URL}/user/send-bets`);
      if(res.data.games.length==0) setNobets(true)
      setBets(res.data.games)
      setLoading(false);
    }
    isAuth()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };


  return (
    <div className='bg-[#1A2C38] lg:h-[100vh] lg:w-[100vw] md:h-[100vh] md:w-[100vw] sm:h-[100vh] sm:w-[100vw] h-[100vh] w-[100vw] flex justify-center items-center ' >
      <Navbar></Navbar>
      <div className="lg:h-[600px] lg:w-[1000px] xl:flex-col  h-[600px] w-[350px]  bg-[#203844]  rounded-md shadow-xl overflow-auto ">
        <div className="lg:w-[100%] lg:h-[50px]  lg:text-2xl md:h-[50px] h-[50px]  lg:font-bold bg-[#0E222E] flex justify-center items-center text-white  "> Leaderboard</div>
        {nobets ?  <div className=" text-[#B2BBD3] font-bold lg:text-2xl md:xl  text-center flex justify-center items-center w-[100%] h-[70%]">No Recent Bets</div> :
        <table className="min-w-full border-collapse ">
          <thead>
            <tr>
              <th className=" p-2 text-center text-[#B2BBD3] font-medium">Time</th>
              <th className=" p-2 text-center text-[#B2BBD3] font-medium">Multiplier</th>
              <th className=" p-2 text-center text-[#B2BBD3] font-medium">Bet</th>
              <th className=" p-2 text-center text-[#B2BBD3] font-medium">Payout</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="bg-[#0E222E] w-full h-10">
                <td className="text-center mx-2 text-[#B2BBD3] font-bold">
                  <Skeleton width={150} height={20} />
                </td>
                <td className="text-center mx-2 text-[#B2BBD3] font-bold">
                  <Skeleton width={100} height={20} />
                </td>
                <td className="text-center mx-2 text-[#B2BBD3] font-bold">
                  <Skeleton width={80} height={20} />
                </td>
                <td className="text-center mx-2 text-[#B2BBD3] font-bold">
                  <Skeleton width={80} height={20} />
                </td>
              </tr>
            ) : (
              
              bets && bets.map((entry: any, index: any) => (
                <tr key={index} className={`${index % 2 === 0 && !loading ? 'bg-[#0E222E]' : 'bg-[#203844]'} lg:h-10`}>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{formatDate(entry.createdAt)}</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.multiplier}x</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.bet}</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.payout}</td>
                </tr>
              ))
              )}



          </tbody>
        </table>}
      </div>
    </div>

  )
}

export default Bets
