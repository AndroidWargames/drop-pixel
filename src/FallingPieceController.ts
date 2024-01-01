import {sumColors} from "./Colors"
import {newBoardData} from "./GameContext"
import {generatePiece} from "./Pieces"
import {boardHeight, boardWidth} from "./constants"
import {BoardData, Chonk, ColorData, Coordinate, FallingPieceController, Piece} from "./types"

export const buildController = (
    fallingPiece: Piece,
    board: BoardData,
    setFallingPiece: (p: Piece) => void,
    setBoard: (b: BoardData) => void
  ): FallingPieceController => {

  const shiftDownOrCommit = () => {
    const newPiece = shiftDown(fallingPiece, board)

    if (newPiece.location.x == fallingPiece.location.x && newPiece.location.y == fallingPiece.location.y) {
      setBoard(sumPieceAndBoard(fallingPiece, board))
      setFallingPiece(generatePiece())
    } else {
      setFallingPiece(newPiece)
    }
  }

  return {
    rotateLeft: () => setFallingPiece(rotateLeft(fallingPiece, board)),
    rotateRight: () => setFallingPiece(rotateRight(fallingPiece, board)),
    rotateRed: () => setFallingPiece(rotateRed(fallingPiece, board)),
    rotateBlue: () => setFallingPiece(rotateBlue(fallingPiece, board)),
    shiftDown: shiftDownOrCommit,
    shiftLeft: () => setFallingPiece(shiftLeft(fallingPiece, board)),
    shiftRight: () => setFallingPiece(shiftRight(fallingPiece, board)),
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
    newBoard[chonk.y][chonk.x] = sumColors(chonk.color, newBoard[chonk.y][chonk.x])
  })
  return newBoard
}


export const absoluteChonks = (piece: Piece): Chonk[] => {
  return piece.chonks.map((chonk) => (
    {...chonk, x: chonk.x + piece.location.x, y: chonk.y + piece.location.y}
  ))
}

const rotateChonkRight = (origin: Coordinate) => {
  return (chonk: Chonk) => (
    {
      ...chonk,
      x: -1 * (chonk.y - origin.y) + origin.x,
      y: (chonk.x - origin.x) + origin.y,
    }
  )
}

const rotateChonkLeft = (origin: Coordinate) => {
  return (chonk: Chonk) => (
    {
      ...chonk,
      x: (chonk.y - origin.y) + origin.x,
      y: -1 * (chonk.x - origin.x) + origin.y,
    }
  )
}

const rotateChonkRed = (origin: Coordinate) => {
  return (chonk: Chonk) => {
    let c = [...chonk.color] as ColorData
    c.push(c.shift() as boolean)
    return { ...chonk, color: c }
  }
}

const rotateChonkBlue = (origin: Coordinate) => {
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
      return valid = false
    }
  })
  return valid
}

const tryToWiggle = (oldPiece: Piece, newPiece: Piece, board: BoardData) => {
  if (validateShift(newPiece, board)) { return newPiece }
  const leftPiece = shiftLeft(newPiece, board)
  if (validateShift(leftPiece, board)) { return leftPiece }
  const rightPiece = shiftRight(newPiece, board)
  if (validateShift(rightPiece, board)) { return rightPiece }
  return oldPiece
}

export const rotateRight = (piece: Piece, board: BoardData) => {
  const method = rotateChonkRight(piece.origin)
  const newPiece = { ...piece, chonks: piece.chonks.map(method)}
  return tryToWiggle(piece, newPiece, board)
}

export const rotateLeft = (piece: Piece, board: BoardData) => {
  const method = rotateChonkLeft(piece.origin)
  const newPiece = { ...piece, chonks: piece.chonks.map(method)}
  return tryToWiggle(piece, newPiece, board)
}

export const rotateRed = (piece: Piece, board: BoardData) => {
  const method = rotateChonkRed(piece.origin)
  const newPiece = { ...piece, chonks: piece.chonks.map(method)}
  return tryToWiggle(piece, newPiece, board)
}

export const rotateBlue = (piece: Piece, board: BoardData) => {
  const method = rotateChonkBlue(piece.origin)
  const newPiece = { ...piece, chonks: piece.chonks.map(method)}
  return tryToWiggle(piece, newPiece, board)
}

export const shiftLeft = (piece: Piece, board: BoardData) => {
  const newPiece = {
    ...piece,
    location: {
      ...piece.location,
      x: piece.location.x - 1
    }
  }
  return validateShift(newPiece, board) ? newPiece : piece
}

export const shiftRight = (piece: Piece, board: BoardData) => {
  const newPiece = {
    ...piece,
    location: {
      ...piece.location,
      x: piece.location.x + 1
    }
  }

  return validateShift(newPiece, board) ? newPiece : piece
}

export const shiftDown = (piece: Piece, board: BoardData) => {
  const newPiece = {
    ...piece,
    location: {
      ...piece.location,
      y: piece.location.y + 1
    }
  }

  return validateShift(newPiece, board) ? newPiece : piece
}
