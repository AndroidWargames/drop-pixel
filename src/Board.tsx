import { BlockRow } from "./BlockRow"
import { boardWidth, boardHeight } from "./constants"
import { black } from "./Colors"
import { useGameContext } from "./GameContext"

export const Board = () => {
  const style = {
    display: "inline-grid",
    gridTemplateColumns: Array(boardWidth).fill("auto").join(" ")
  }
  const { board } = useGameContext()
  return (
    <div style={style} className="Board">
      
      {board.map((row, i) => <BlockRow key={i} y={i} rowColors={row}/>)}
    </div>
  )
}

export const newBoardData = Array.from({length: boardHeight}, () => Array.from({length: boardWidth}, () => black))
