import { createContext, useContext, useState } from "react"
import {BoardData, Piece, FallingPieceController} from "./types"
import {absoluteChonks, generatePiece, rotateBlue, rotateLeft, rotateRed, rotateRight, shiftDown, shiftLeft, shiftRight} from "./Pieces"
import {black, sumColors} from "./Colors"
import {boardHeight, boardWidth} from "./constants"

export type GameContextType = {
  board: BoardData
  fallingPieceController: FallingPieceController
}

const GameContext = createContext<GameContextType | undefined>(undefined)

const newBoardData = () => Array.from({length: boardHeight}, () => Array.from({length: boardWidth}, () => black))

const sumPieceAndBoard = (piece: Piece, board: BoardData) => {
  let newBoard = newBoardData()
  board.forEach((row, y) => {
    row.forEach((block, x) => {
    if (block.reduce((a, b) => a || b)) {
        newBoard[y][x] = block
      }
    })
  })
  absoluteChonks(piece).forEach((chonk) => {
    newBoard[chonk.y][chonk.x] = sumColors(chonk.color, newBoard[chonk.y][chonk.x])
  })
  return newBoard
}

export const GameProvider = ({children}: {children: React.ReactNode}) => {
  const [board, setBoard] = useState<BoardData>(newBoardData())
  const [fallingPiece, setFallingPiece] = useState<Piece>(generatePiece())

  const shiftDownOrCommit = () => {
    const newPiece = shiftDown(fallingPiece, board)

    if (newPiece.location.x == fallingPiece.location.x && newPiece.location.y == fallingPiece.location.y) {
      setBoard(sumPieceAndBoard(fallingPiece, board))
      setFallingPiece(generatePiece())
    } else {
      setFallingPiece(newPiece)
    }
  }

  const fallingPieceController: FallingPieceController = {
    rotateLeft: () => setFallingPiece(rotateLeft(fallingPiece, board)),
    rotateRight: () => setFallingPiece(rotateRight(fallingPiece, board)),
    rotateRed: () => setFallingPiece(rotateRed(fallingPiece, board)),
    rotateBlue: () => setFallingPiece(rotateBlue(fallingPiece, board)),
    shiftDown: shiftDownOrCommit,
    shiftLeft: () => setFallingPiece(shiftLeft(fallingPiece, board)),
    shiftRight: () => setFallingPiece(shiftRight(fallingPiece, board)),
  }

  const value = {
    board: sumPieceAndBoard(fallingPiece, board), fallingPieceController
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
