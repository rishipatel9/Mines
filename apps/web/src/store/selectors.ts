
export const selectMinesIndex = (state: { mineIndex: {minesIndex: number[]}}) => state.mineIndex;

export const selectBet=(state: {bet :{bet:boolean}} )=>state.bet

export const selectDisplayAll= (state :{displayAll :{display :boolean}}) =>state.displayAll

export const selectDiamondCount = (state :{diamond :{diamondCount:number}}) =>state.diamond

export const selectTile=(state:{tile:number[]}) =>state.tile