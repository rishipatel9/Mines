import { selectBet, selectDisplayAll, selectMinesIndex } from "../../store/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import { toFalse } from "../../utility/betSlice.js";
import { displayAll } from "../../utility/displayAns.js";
import { addClick, resetClicks } from "../../utility/tileSlice.js";
import { updateDiamondCount } from "../../utility/diamondCount.js";
import { updateMultiplier } from "../../utility/multiplier.js"; 

interface TileProps {
  image: string,
  index: number
}

const Tile: React.FC<TileProps> = ({ image, index }) => {

  const dispatch = useDispatch();
  const isBetLive = useSelector(selectBet);
  const setDisplayAll = useSelector(selectDisplayAll);
  const clicks = useSelector((state: any) => state.tiles.clicks);
  const mines = useSelector(selectMinesIndex);

  function factorial(n: number): number {
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  function nCr(n: number, r: number): number {
    if (r > n) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
  }

  function calculateMultiplier(mines: number, diamonds: number): number {
    const houseEdge = 0.01; // Unified house edge
    // console.log((1 - houseEdge) * nCr(25, diamonds) / nCr(25 - mines, diamonds));
    return (1 - houseEdge) * nCr(25, diamonds) / nCr(25 - mines, diamonds);
  }

  const handleClick = () => {
    if (isBetLive.bet) {
      dispatch(addClick({ index, value: true }));
      dispatch(updateDiamondCount());

      const trueClicks = clicks.filter((click: boolean) => click === true).length + 1; // Include current click
      console.log(trueClicks);

      const multiplier = calculateMultiplier(mines.minesIndex.length, trueClicks);
      dispatch(updateMultiplier(multiplier.toFixed(2)));
    }

    if (image === "/src/assets/diamond.jpg") {
      console.log("hello");
      dispatch(toFalse());
      dispatch(displayAll());
      dispatch(resetClicks());
    }
  };

  return (
    <button
      className={`2xl:w-[115px] 2xl:h-[115px] lg:h-[110px] lg:w-[110px] 2xl:m-[120px] lg:m-8 w-[65px] h-[65px] bg-[#304553] rounded-lg border-[#223744] hover:bg-[#B9C6E7] transition-all hover:mt-1 ${setDisplayAll.display || clicks[index] ? "" : "border-b-4"}`}
      onClick={handleClick}
    >
      <img
        src={image}
        className={`w-[100%] h-[100%] ${setDisplayAll.display || (isBetLive.bet && clicks[index]) ? "" : "hidden"}`}
        alt=""
      />
    </button>
  );
};

export default Tile;
