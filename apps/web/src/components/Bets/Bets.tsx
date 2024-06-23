import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Bets = () => {

  axios.defaults.withCredentials = true;
  const [bets, setBets] = useState<number[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = async () => {
      const res = await axios.post('http://localhost:3000/user/send-bets');
      setBets(res.data.games)
      console.log(bets);
      setLoading(false);
    }
    isAuth()
  }, [])


  return (
    <div className='bg-[#1A2C38] lg:h-[100vh] lg:w-[100vw] md:h-[100vh] md:w-[100vw] sm:h-[100vh] sm:w-[100vw] h-[100vh] w-[100vw] flex justify-center items-center ' >
      <div className="lg:h-[600px] lg:w-[1000px] xl:flex-col  h-[600px] w-[350px]  bg-[#203844]  rounded-md shadow-xl overflow-auto ">
        <div className="lg:w-[100%] lg:h-[50px]  lg:text-2xl lg:font-bold bg-[#0E222E] flex justify-center items-center text-white  "> Leaderboard</div>
        <table className="min-w-full border-collapse ">
          <thead>
            <tr>
              <th className=" p-2 text-center text-[#B2BBD3] font-medium">Username</th>
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
                  <Skeleton width={100} height={20} />
                </td>
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
                <tr key={index} className={`${index % 2 === 0 ? 'bg-[#0E222E]' : 'bg-[#203844]'} lg:h-10`}>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.username}</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.createdAt}</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.multiplier}</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.bet}</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.payout}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Bets
