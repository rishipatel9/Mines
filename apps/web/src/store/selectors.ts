
export const selectMinesIndex = (state: { mineIndex: {minesIndex: number[]}}) => state.mineIndex;

export const selectBet=(state: {bet :{bet:boolean}} )=>state.bet

export const selectDisplayAll= (state :{displayAll :{display :boolean}}) =>state.displayAll

export const selectDiamondCount = (state:any) => state.diamondCount.count;

export const selectTile=(state:{tile:number[]}) =>state.tile

export const selectMultiplier=(state:any)=>state.multiplier.multiplier;

export const selectPayout=(state:any)=>state.payout.payout

export const selectBetAmount=(state:any)=>state.betAmount.betAmount