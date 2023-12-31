import {blue, green, magenta, red, sumColors} from "./Colors"
import {boardHeight, boardWidth} from "./constants"
import {BoardData, Piece, Chonk, Coordinate, ColorData} from "./types"

export const generatePiece = (): Piece => {
  return {
    chonks: [
      {x: 0, y: 0, color: red},
      {x: 1, y: 0, color: blue},
      {x: 1, y: 1, color: magenta},
      {x: 2, y: 1, color: green},
    ],
    origin: {x: 1, y: 0},
    location: {x: 4, y: 1},
    kind: "z"
  }
}

export const absoluteChonks = (piece: Piece) => {
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
    let c = chonk.color
    c.push(c.shift() as boolean)
    return { ...chonk, color: c }
  }
}

const rotateChonkBlue = (origin: Coordinate) => {
  return (chonk: Chonk) => {
    let c = chonk.color
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
