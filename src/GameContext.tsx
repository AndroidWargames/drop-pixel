import { createContext, useContext, useState } from "react"
import {BoardData, BoardAssignment} from "./types"
import {newBoardData} from "./Board"

export type GameContextType = {
  board: BoardData
  setBoard: (b: BoardData) => void
  setColor: (assignment: BoardAssignment) => void
  setColors: (assignments: BoardAssignment[]) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({children}: {children: React.ReactNode}) => {
  const [board, setBoard] = useState<BoardData>(newBoardData)
  const setColors = (assignments: BoardAssignment[]) => {
    var clone = Object.assign([], board) as BoardData
    assignments.forEach((assignment) => {
      clone[assignment.y][assignment.x] = assignment.color
    })
    setBoard(clone)
  }
  const setColor = (assignment: BoardAssignment) => {
    setColors([assignment])
  }

  return (
    <GameContext.Provider value={{board, setBoard, setColor, setColors}}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  const context = useContext(GameContext)
    if (!context) throw Error("useAuthContext can only be used inside an AuthProvider");
  return context
}
