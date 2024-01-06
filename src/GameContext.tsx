import { createContext, useContext, useState } from "react"
import {BoardData, Pieces, FallingPieceController} from "./types"
import { buildController, sumPieceAndBoard } from "./FallingPieceController"
import {black} from "./Colors"
import {boardHeight, boardWidth} from "./constants"
import {generatePiece} from "./Pieces"

export type GameContextType = {
  board: BoardData
  fallingPieceController: FallingPieceController
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const newBoardData = () => Array.from({length: boardHeight}, () => Array.from({length: boardWidth}, () => black))

export const GameProvider = ({children}: {children: React.ReactNode}) => {
  const [board, setBoard] = useState<BoardData>(newBoardData())
  const [pieces, setPieces] = useState<Pieces>(
    {
      fallingPiece: generatePiece(),
      pieceQueue: [generatePiece(), generatePiece(), generatePiece()]
    }
  )


  const fallingPieceController = buildController(pieces, board, setPieces, setBoard)

  const value = {
    board: sumPieceAndBoard(pieces.fallingPiece, board), fallingPieceController
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  const context = useContext(GameContext)
    if (!context) throw Error("useAuthContext can only be used inside an AuthProvider");
  return context
}
