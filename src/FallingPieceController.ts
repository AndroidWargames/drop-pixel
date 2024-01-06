import { sumColors } from "./Colors"
import { newBoardData } from "./GameContext"
import { generatePiece } from "./Pieces"
import { boardHeight, boardWidth } from "./constants"
import {
  BoardData,
  Chonk,
  ColorData,
  Coordinate,
  FallingPieceController,
  Piece,
  Pieces,
} from "./types"

export const buildController = (
  pieces: Pieces,
  board: BoardData,
  setPieces: (p: Pieces) => void,
  setBoard: (b: BoardData) => void
): FallingPieceController => {
  const { fallingPiece, pieceQueue } = pieces

  const commit = (piece: Piece) => {
    setBoard(sumPieceAndBoard(piece, board))
    const nextPiece = pieceQueue.shift() as Piece
    setPieces({
      fallingPiece: nextPiece,
      pieceQueue: [...pieceQueue, generatePiece()],
    })
  }

  const shiftDownOrCommit = () => {
    const newPiece = shiftDown(fallingPiece, board)

    if (
      newPiece.location.x == fallingPiece.location.x &&
      newPiece.location.y == fallingPiece.location.y
    ) {
      commit(newPiece)
    } else {
      setPieces({ ...pieces, fallingPiece: newPiece })
    }
  }

  const setFallingPiece = (p: Piece): void => {
    setPieces({ ...pieces, fallingPiece: p })
  }

  const dropAndCommit = () => {
    let y = fallingPiece.location.y
    let newPiece = shiftDown(fallingPiece, board)
    while (newPiece.location.y != y) {
      y = newPiece.location.y
      newPiece = shiftDown(newPiece, board)
    }
    commit(newPiece)
  }

  return {
    rotateLeft: () => setFallingPiece(rotateLeft(fallingPiece, board)),
    rotateRight: () => setFallingPiece(rotateRight(fallingPiece, board)),
    rotateRed: () => setFallingPiece(rotateRed(fallingPiece, board)),
    rotateBlue: () => setFallingPiece(rotateBlue(fallingPiece, board)),
    shiftDown: shiftDownOrCommit,
    shiftLeft: () => setFallingPiece(shiftLeft(fallingPiece, board)),
    shiftRight: () => setFallingPiece(shiftRight(fallingPiece, board)),
    drop: () => dropAndCommit(),
  }
}

export const sumPieceAndBoard = (piece: Piece, board: BoardData) => {
  let newBoard = newBoardData()
  board.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.reduce((a, b) => a || b)) {
        newBoard[y][x] = block
      }
    })
  })
  absoluteChonks(piece).forEach((chonk) => {
    newBoard[chonk.y][chonk.x] = sumColors(
      chonk.color,
      newBoard[chonk.y][chonk.x]
    )
  })
  return newBoard
}

export const absoluteChonks = (piece: Piece): Chonk[] => {
  return piece.chonks.map((chonk) => ({
    ...chonk,
    x: chonk.x + piece.location.x,
    y: chonk.y + piece.location.y,
  }))
}

const rotateChonkRight = (origin: Coordinate) => {
  return (chonk: Chonk) => ({
    ...chonk,
    x: -1 * (chonk.y - origin.y) + origin.x,
    y: chonk.x - origin.x + origin.y,
  })
}

const rotateChonkLeft = (origin: Coordinate) => {
  return (chonk: Chonk) => ({
    ...chonk,
    x: chonk.y - origin.y + origin.x,
    y: -1 * (chonk.x - origin.x) + origin.y,
  })
}

const rotateChonkRed = (_: Coordinate) => {
  return (chonk: Chonk) => {
    let c = [...chonk.color] as ColorData
    c.push(c.shift() as boolean)
    return { ...chonk, color: c }
  }
}

const rotateChonkBlue = (_: Coordinate) => {
  return (chonk: Chonk) => {
    let c = [...chonk.color] as ColorData
    c.unshift(c.pop() as boolean)
    return { ...chonk, color: c }
  }
}

const validateShift = (piece: Piece, board: BoardData) => {
  let valid = true
  absoluteChonks(piece).forEach((chonk) => {
    if (chonk.x < 0 || chonk.x >= boardWidth || chonk.y >= boardHeight) {
      return (valid = false)
    }
    const zipped = board[chonk.y][chonk.x].map((v, i) => chonk.color[i] && v)
    const overload = zipped.reduce((a, b) => a || b)
    if (overload) {
      return (valid = false)
    }
  })
  return valid
}

const tryToWiggle = (oldPiece: Piece, newPiece: Piece, board: BoardData) => {
  if (validateShift(newPiece, board)) {
    return newPiece
  }
  const leftPiece = shiftLeft(newPiece, board)
  if (validateShift(leftPiece, board)) {
    return leftPiece
  }
  const rightPiece = shiftRight(newPiece, board)
  if (validateShift(rightPiece, board)) {
    return rightPiece
  }
  return oldPiece
}

export const rotateRight = (piece: Piece, board: BoardData) => {
  const method = rotateChonkRight(piece.origin)
  const newPiece = { ...piece, chonks: piece.chonks.map(method) }
  return tryToWiggle(piece, newPiece, board)
}

export const rotateLeft = (piece: Piece, board: BoardData) => {
  const method = rotateChonkLeft(piece.origin)
  const newPiece = { ...piece, chonks: piece.chonks.map(method) }
  return tryToWiggle(piece, newPiece, board)
}

export const rotateRed = (piece: Piece, board: BoardData) => {
  const method = rotateChonkRed(piece.origin)
  const newPiece = { ...piece, chonks: piece.chonks.map(method) }
  return tryToWiggle(piece, newPiece, board)
}

export const rotateBlue = (piece: Piece, board: BoardData) => {
  const method = rotateChonkBlue(piece.origin)
  const newPiece = { ...piece, chonks: piece.chonks.map(method) }
  return tryToWiggle(piece, newPiece, board)
}

export const shiftLeft = (piece: Piece, board: BoardData) => {
  const newPiece = {
    ...piece,
    location: {
      ...piece.location,
      x: piece.location.x - 1,
    },
  }
  return validateShift(newPiece, board) ? newPiece : piece
}

export const shiftRight = (piece: Piece, board: BoardData) => {
  const newPiece = {
    ...piece,
    location: {
      ...piece.location,
      x: piece.location.x + 1,
    },
  }

  return validateShift(newPiece, board) ? newPiece : piece
}

export const shiftDown = (piece: Piece, board: BoardData) => {
  const newPiece = {
    ...piece,
    location: {
      ...piece.location,
      y: piece.location.y + 1,
    },
  }

  return validateShift(newPiece, board) ? newPiece : piece
}
