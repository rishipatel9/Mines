import { selectBet } from "../..//store/selectors.js"
import { useSelector } from "react-redux"
import { useState } from "react";
interface TileProps {
  image: string;
}

const Tile: React.FC<TileProps> = ({ image }) => {
  const [click,setClick]=useState(false);
  const isBetLive=useSelector(selectBet)

  return (
      // <div className=" 2xl:h-[170px] 2xl:w-[170px] 2xl:mx-10 xl:h-[120px] xl:w-[120px] lg:h-[100px] lg:w-[100px] lg:mx-4  bg-[#304553] rounded-lg  border-b-4 border-[#223744] hover:bg-[#B9C6E7] transition-all hover:mt-4"></div>
      <button className="2xl:w-[115px] 2xl:h-[115px] lg:h-[110px] lg:w-[110px] 2xl:m-[120px] lg:m-8  w-[65px] h-[65px]  bg-[#304553] rounded-lg  border-b-4 border-[#223744] hover:bg-[#B9C6E7] transition-all hover:mt-1 " onClick={()=>
        setClick(true)
      }>
      {isBetLive.bet && click &&   <img src={image}  className="w-[100%] h-[100%]  " alt="" />}
      </button>
  )
}

export default Tile
