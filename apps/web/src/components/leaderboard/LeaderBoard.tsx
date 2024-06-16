import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LeaderBoard = () => {

    axios.defaults.withCredentials=true;
    
    const history=useNavigate();
    useEffect(()=>{
        const isAuth=async()=>{
            const res=await axios.post('http://localhost:3000/sendlist');
            console.log(res)
            if(res.status===201){
                history('/');
            }
        }
        isAuth()
    },[])
    const data = [
        {
          time: '2024-06-16T08:30:00Z',
          bet: 50,
          payout: 125,
          multiplier: 2.5,
          username: 'user1'
        },
        {
          time: '2024-06-16T08:35:00Z',
          bet: 75,
          payout: 187.5,
          multiplier: 2.5,
          username: 'user2'
        },
        {
          time: '2024-06-16T08:40:00Z',
          bet: 100,
          payout: 250,
          multiplier: 2.5,
          username: 'user3'
        },
        {
          time: '2024-06-16T08:45:00Z',
          bet: 60,
          payout: 180,
          multiplier: 3,
          username: 'user4'
        },
        {
          time: '2024-06-16T08:50:00Z',
          bet: 90,
          payout: 270,
          multiplier: 3,
          username: 'user5'
        },
        {
          time: '2024-06-16T08:55:00Z',
          bet: 120,
          payout: 360,
          multiplier: 3,
          username: 'user6'
        },
        {
          time: '2024-06-16T09:00:00Z',
          bet: 150,
          payout: 450,
          multiplier: 3,
          username: 'user7'
        },
        {
          time: '2024-06-16T09:05:00Z',
          bet: 80,
          payout: 200,
          multiplier: 2.5,
          username: 'user8'
        },
        {
          time: '2024-06-16T09:10:00Z',
          bet: 95,
          payout: 237.5,
          multiplier: 2.5,
          username: 'user9'
        },
        {
          time: '2024-06-16T09:15:00Z',
          bet: 110,
          payout: 275,
          multiplier: 2.5,
          username: 'user10'
        },{
            time: '2024-06-16T08:40:00Z',
            bet: 100,
            payout: 250,
            multiplier: 2.5,
            username: 'user3'
          },
          {
            time: '2024-06-16T08:45:00Z',
            bet: 60,
            payout: 180,
            multiplier: 3,
            username: 'user4'
          },
          {
            time: '2024-06-16T08:50:00Z',
            bet: 90,
            payout: 270,
            multiplier: 3,
            username: 'user5'
          },{
            time: '2024-06-16T08:40:00Z',
            bet: 100,
            payout: 250,
            multiplier: 2.5,
            username: 'user3'
          },
          {
            time: '2024-06-16T08:45:00Z',
            bet: 60,
            payout: 180,
            multiplier: 3,
            username: 'user4'
          },
          {
            time: '2024-06-16T08:50:00Z',
            bet: 90,
            payout: 270,
            multiplier: 3,
            username: 'user5'
          },{
            time: '2024-06-16T08:40:00Z',
            bet: 100,
            payout: 250,
            multiplier: 2.5,
            username: 'user3'
          },
          {
            time: '2024-06-16T08:45:00Z',
            bet: 60,
            payout: 180,
            multiplier: 3,
            username: 'user4'
          },
          {
            time: '2024-06-16T08:50:00Z',
            bet: 90,
            payout: 270,
            multiplier: 3,
            username: 'user5'
          },{
            time: '2024-06-16T08:40:00Z',
            bet: 100,
            payout: 250,
            multiplier: 2.5,
            username: 'user3'
          },
          {
            time: '2024-06-16T08:45:00Z',
            bet: 60,
            payout: 180,
            multiplier: 3,
            username: 'user4'
          },
          {
            time: '2024-06-16T08:50:00Z',
            bet: 90,
            payout: 270,
            multiplier: 3,
            username: 'user5'
          },
      ];
      
    //   console.log(data);
      
    return (
        <div className='bg-[#1A2C38] lg:h-[100vh] lg:w-[100vw] md:h-[100vh] md:w-[100vw] sm:h-[100vh] sm:w-[100vw] h-[100vh] w-[100vw] flex justify-center items-center ' >
            <div className="lg:h-[600px] lg:w-[1000px]  xl:flex-col  h-[600px] w-[350px]  bg-[#203844]  rounded-md shadow-xl overflow-auto ">
                <div className="lg:w-[100%] lg:h-[50px] lg:text-2xl lg:font-bold bg-[#0E222E] flex justify-center items-center text-white  "> Leaderboard</div>
                <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2 text-left">Time</th>
            <th className="border border-gray-200 p-2 text-left">Bet</th>
            <th className="border border-gray-200 p-2 text-left">Payout</th>
            <th className="border border-gray-200 p-2 text-left">Multiplier</th>
            <th className="border border-gray-200 p-2 text-left">Username</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
              <td className="border border-gray-200 p-2">{new Date(entry.time).toLocaleString()}</td>
              <td className="border border-gray-200 p-2">{entry.bet}</td>
              <td className="border border-gray-200 p-2">{entry.payout}</td>
              <td className="border border-gray-200 p-2">{entry.multiplier}</td>
              <td className="border border-gray-200 p-2">{entry.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
                
            </div>
        </div>

    )
}

export default LeaderBoard
