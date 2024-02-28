import { createContext, useContext, useState } from "react"
import { BoardData, Pieces, FallingPieceController, Piece } from "./types"
import {
  buildController,
  droppedPiece,
  sumPieceAndBoard,
  validateShift,
} from "./FallingPieceController"
import { black, colorComponents } from "./Colors"
import { boardHeight, boardWidth } from "./constants"
import { PieceCounts, generatePiece, newPieceCounts } from "./Pieces"
import { all } from "./reducers"
import {
  GameSettingsHandler,
  defaultGameSettings,
  newHandler,
} from "./GameSettings"

export type GameContextType = {
  board: BoardData
  fallingPieceController: FallingPieceController
  pieces: Pieces
  lines: number
  score: number
  ghostPiece: Piece
  settings: GameSettingsHandler
  nextTick: number
  setNextTick: (n: number) => void
  resetGame: () => void
  highScore: number
  gameOver: boolean
}

const highScoreStorageLabel = "drop-pixel.high-score"
const GameContext = createContext<GameContextType | undefined>(undefined)

export const newBoardData = () =>
  Array.from({ length: boardHeight }, () =>
    Array.from({ length: boardWidth }, () => black)
  )

const newPiece = (
  pieces: Pieces,
  setPieces: (p: Pieces) => void,
  pieceCounts: PieceCounts,
  setPieceCounts: (p: PieceCounts) => void,
  detectEndedGame: (p: Piece) => void
) => {
  const nextPiece = pieces.pieceQueue.shift() as Piece
  detectEndedGame(nextPiece)
  const generatedPiece = generatePiece(pieceCounts)
  let newPieceCounts = { ...pieceCounts }
  generatedPiece.chonks.forEach((chonk) => {
    colorComponents(chonk.color).forEach((a) => {
      newPieceCounts[generatedPiece.kind + a] += 1
    })
  })
  setPieceCounts(newPieceCounts)
  setPieces({
    fallingPiece: nextPiece,
    pieceQueue: [...pieces.pieceQueue, generatedPiece],
  })
}

export const getLevel = (lines: number) => {
  return Math.floor(lines / 3)
}

export const getTimeOut = (lines: number) => {
  return 1000 - getLevel(lines) * 75
}

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = useState<BoardData>(newBoardData())
  const [pieces, setPieces] = useState<Pieces>({
    fallingPiece: generatePiece(),
    pieceQueue: [generatePiece(), generatePiece(), generatePiece()],
  })
  const [gameOver, setGameOver] = useState(false)
  const [pieceCounts, setPieceCounts] = useState(newPieceCounts())
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [nextTick, setNextTick] = useState(Date.now() + getTimeOut(lines))
  const [gameSettings, setGameSettings] = useState(defaultGameSettings)
  const highScore = parseInt(localStorage.getItem(highScoreStorageLabel) ?? "0")

  const updateScore = (s: number) => {
    setScore(s)
    if (s > highScore) {
      localStorage.setItem(highScoreStorageLabel, s.toString())
    }
  }

  const settings = newHandler(gameSettings, setGameSettings)

  const detectEndedGame = (piece: Piece) => {
    if (!validateShift(piece, board)) {
      setGameOver(true)
    }
  }

  const commit = (piece: Piece) => {
    let result = sumPieceAndBoard(piece, board)

    for (let i = result.length - 1; i >= 0; i--) {
      if (result[i].map((d) => d.reduce(all)).reduce(all)) {
        result.splice(i, 1)
      }
    }
    const rowCount = boardHeight - result.length
    const newRows = Array.from({ length: rowCount }, () =>
      Array.from({ length: boardWidth }, () => black)
    )
    result = [...newRows, ...result]
    setBoard(result)
    if (rowCount > 0) {
      updateScore(score + 2 ** (rowCount - 1))
    }
    setLines(lines + rowCount)
    newPiece(pieces, setPieces, pieceCounts, setPieceCounts, detectEndedGame)
  }

  const resetGame = () => {
    setBoard(newBoardData)
    setGameOver(false)
    setLines(0)
    setScore(0)
    setPieces({
      fallingPiece: generatePiece(),
      pieceQueue: [generatePiece(), generatePiece(), generatePiece()],
    })
  }

  const ghostPiece = droppedPiece(pieces.fallingPiece, board)

  const fallingPieceController = buildController(
    pieces,
    board,
    setPieces,
    settings.paused,
    commit
  )

  const value = {
    board: sumPieceAndBoard(pieces.fallingPiece, board),
    fallingPieceController,
    pieces,
    lines,
    score,
    ghostPiece,
    settings,
    nextTick,
    resetGame,
    setNextTick,
    highScore,
    gameOver,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context)
    throw Error("useAuthContext can only be used inside an AuthProvider")
  return context
}
