import { createContext, useContext, useState } from "react"
import { BoardData, Pieces, FallingPieceController, Piece } from "./types"
import { buildController, sumPieceAndBoard } from "./FallingPieceController"
import { black, colorComponents } from "./Colors"
import { boardHeight, boardWidth } from "./constants"
import { PieceCounts, generatePiece, newPieceCounts } from "./Pieces"
import { all } from "./reducers"

export type GameContextType = {
  board: BoardData
  fallingPieceController: FallingPieceController
  pieces: Pieces
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const newBoardData = () =>
  Array.from({ length: boardHeight }, () =>
    Array.from({ length: boardWidth }, () => black)
  )

const newPiece = (
  pieces: Pieces,
  setPieces: (p: Pieces) => void,
  pieceCounts: PieceCounts,
  setPieceCounts: (p: PieceCounts) => void
) => {
  const nextPiece = pieces.pieceQueue.shift() as Piece
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

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = useState<BoardData>(newBoardData())
  const [pieces, setPieces] = useState<Pieces>({
    fallingPiece: generatePiece(),
    pieceQueue: [generatePiece(), generatePiece(), generatePiece()],
  })
  const [pieceCounts, setPieceCounts] = useState(newPieceCounts())

  const commit = (piece: Piece) => {
    let result = sumPieceAndBoard(piece, board)

    for (let i = result.length - 1; i >= 0; i--) {
      if (result[i].map((d) => d.reduce(all)).reduce(all)) {
        result.splice(i, 1)
      }
    }
    const rowCount = boardHeight - result.length
    const newRows = Array.from({ length: rowCount }, () =>
      Array.from({ length: boardWidth }, () => black))
    result = [...newRows, ...result]
    setBoard(result)
    newPiece(pieces, setPieces, pieceCounts, setPieceCounts)
  }

  const fallingPieceController = buildController(
    pieces,
    board,
    setPieces,
    commit
  )

  const value = {
    board: sumPieceAndBoard(pieces.fallingPiece, board),
    fallingPieceController,
    pieces,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context)
    throw Error("useAuthContext can only be used inside an AuthProvider")
  return context
}
