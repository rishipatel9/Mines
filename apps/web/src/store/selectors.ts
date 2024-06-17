
export const selectMinesIndex = (state: { mineIndex: {minesIndex: number[]}}) => state.mineIndex;

export const selectBet=(state: {bet :{bet:string}} )=>state.bet

export const selectDisplayAll= (state :{displayAll :{display :boolean}}) =>state.displayAll

export const selectDiamondCount=(state :{diamond :number})=>state.diamond