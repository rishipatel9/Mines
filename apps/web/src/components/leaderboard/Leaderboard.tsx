import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Navbar from "../ui/Navbar.js";

interface LeaderboardEntry {
  user: {
    name: string;
  };
  createdAt: string;
  bet: number;
  multiplier: number;
  payout: number;
}


const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const BASE_URL =import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/user/send-leaderboard`);
        setLeaderboard(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getLeaderboard();
  }, []);

  const sortData = (key: keyof LeaderboardEntry) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedLeaderboard = () => {
    let sortableItems = [...leaderboard];
    if (sortConfig.key !== '') {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  };

  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-[#1A2C38] lg:h-[100vh] lg:w-[100vw] md:h-[100vh] md:w-[100vw] sm:h-[100vh] sm:w-[100vw] h-[100vh] w-[100vw] flex justify-center items-center">
      <Navbar />
      <div className="lg:h-[600px] lg:w-[1000px] xl:flex-col h-[600px] w-[350px] bg-[#203844] rounded-md shadow-xl overflow-auto">
        <div className="lg:w-[100%] lg:h-[50px] lg:text-2xl md:h-[50px] h-[50px] lg:font-bold bg-[#0E222E] flex justify-center items-center text-white">
          Leaderboard
        </div>
        <table className="w-full border-collapse md:p-10">
          <thead>
            <tr>
              <th className="p-2 text-center text-[#B2BBD3] font-medium ">Name</th>
              <th className="p-2 text-center text-[#B2BBD3] font-medium ">Time</th>
              <th className="p-2 text-center text-[#B2BBD3] font-medium " 
              onClick={() => sortData('bet')}
              >Bet</th>
              <th
                className="p-2 text-center text-[#B2BBD3] font-medium cursor-pointer"
                onClick={() => sortData('multiplier')}
              >
                Multiplier
              </th>
              <th
                className="p-2 text-center text-[#B2BBD3] font-medium cursor-pointer"
                onClick={() => sortData('payout')}
              >
                Payout
              </th>
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
                <td className="text-center mx-2 text-[#B2BBD3] font-bold">
                  <Skeleton width={80} height={20} />
                </td>
              </tr>
            ) : (
              sortedLeaderboard().map((entry:LeaderboardEntry, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-[#0E222E]' : 'bg-[#203844]'} lg:h-10`}>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.user.name}</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{formatDate(entry.createdAt)}</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.bet}</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.multiplier}</td>
                  <td className="text-center mx-2 text-[#B2BBD3] font-bold">{entry.payout}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
