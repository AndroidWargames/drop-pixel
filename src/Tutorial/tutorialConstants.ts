import { black, blue, cyan, green, red, white, yellow } from "../Colors"
import {
  droppedPiece,
  rotateLeft,
  shiftDown,
  shiftLeft,
  shiftRight,
  sumPieceAndBoard,
} from "../FallingPieceController"
import { newBoardData } from "../GameContext"
import { generateSpecificPiece } from "../Pieces"
import { boardHeight, boardWidth } from "../constants"
import { BoardData, ColorData, Piece } from "../types"

const noopTransform = (p: Piece, _: BoardData): Piece => p
const boardData = newBoardData()

export type TutorialName =
  | "rotate"
  | "slide"
  | "drop"
  | "rgb"
  | "mixing"
  | "dropMix"
  | "dropBlock"
  | "completeLine"

export type FlashKey = "left" | "right" | "up" | "down" | "space"

type ChangeData = {
  boardData: BoardData
  pieceData: {
    delta: (p: Piece, b: BoardData) => Piece
    time: number
    flashKeys?: FlashKey[]
  }[]
}

export type FrameData = {
  boardData: BoardData
  time: number
  flashKeys: FlashKey[]
}

const boardFromFrame = (data: ChangeData): FrameData[] => {
  let piece = generateSpecificPiece("t", [true, false, false])
  piece.location = { x: 3, y: 6 }

  let output: FrameData[] = []

  for (let i = 0; i < data.pieceData.length; i++) {
    piece = data.pieceData[i].delta(piece, boardData)
    if (data.pieceData[i].flashKeys) {
      output.push({
        boardData: sumPieceAndBoard(piece, data.boardData),
        time: 0.2,
        flashKeys: data.pieceData[i].flashKeys ?? [],
      })
      output.push({
        boardData: sumPieceAndBoard(piece, data.boardData),
        time: data.pieceData[i].time - 0.2,
        flashKeys: [],
      })
    } else {
      output.push({
        boardData: sumPieceAndBoard(piece, data.boardData),
        time: data.pieceData[i].time,
        flashKeys: [],
      })
    }
  }
  return output
}

const buildRgb = () => {
  const row = [red, red, black, green, green, black, blue, blue]
  return [row, row]
}

const numArray = (v: number, length: number) => {
  return Array.from({ length }, () => v)
}

const buildMixing = () => {
  const rowData: ColorData[][] = Array.from({ length: 48 }, () =>
    Array.from({ length: 8 }, () => [false, false, false])
  )

  const redX: number[] = [0, 0, 1, 2, 3, 4, 5, 6].concat(numArray(6, 16))
  const greenX: number[] = numArray(0, 16).concat([0, 0, 1, 2, 3, 4, 5, 6])
  const blueX: number[] = numArray(6, 8).concat(
    [6, 6, 5, 4, 3, 2, 1, 0].concat(numArray(0, 8))
  )

  ;[redX, greenX, blueX].forEach((color: number[], i) => {
    color.forEach((t, j) => {
      rowData[j][t][i] = true
      rowData[j][t + 1][i] = true
      rowData[j + 24][7 - t][i] = true
      rowData[j + 24][6 - t][i] = true
    })
  })

  const outputData = rowData.map((row) => {
    return { boardData: [row, row], flashKeys: [], time: 0.2 }
  })
  const k = 44
  return outputData.slice(k).concat(outputData.slice(0, k))
}

const buildDropMix = (
  colorPairs: [ColorData, ColorData][],
  offset: number = 0
): FrameData[] => {
  let frameData: FrameData[] = []
  colorPairs.forEach(([p, b]) => {
    let boardPiece = generateSpecificPiece("o", b)
    boardPiece.location = { x: 3, y: boardHeight - 2 }

    let boardData = sumPieceAndBoard(boardPiece, newBoardData())

    let piece = generateSpecificPiece("t", p)

    for (let y = boardHeight - 5 - offset; y <= boardHeight - 2 - offset; y++) {
      piece.location = { x: 2, y }
      frameData.push({
        boardData: sumPieceAndBoard(piece, boardData),
        time: y == boardHeight - 2 - offset ? 1.5 : 0.5,
        flashKeys: [],
      })
    }
  })
  return frameData
}

const buildCompleteLine = () => {
  let boardData = newBoardData()
  for (let i = 0; i < boardWidth; i++) {
    if (i != 4) {
      boardData[boardHeight - 1][i] = white
      boardData[boardHeight - 2][i] = white
    } else {
      boardData[boardHeight - 1][i] = cyan
      boardData[boardHeight - 2][i] = cyan
    }
  }
  let piece = generateSpecificPiece("i", red)
  let frameData: FrameData[] = []
  for (let y = boardHeight - 8; y < boardHeight - 3; y++) {
    piece.location = { x: 4, y }
    frameData.push({
      boardData: sumPieceAndBoard(piece, boardData),
      time: 1,
      flashKeys: [],
    })
  }
  boardData = newBoardData()
  boardData[boardHeight - 1][4] = red
  boardData[boardHeight - 2][4] = red
  frameData.push( {
    boardData,
    time: 2.5,
    flashKeys: [],
  })
  return frameData
}

export const tutorialData: Record<TutorialName, FrameData[]> = {
  rotate: boardFromFrame({
    boardData: boardData,
    pieceData: [
      { delta: noopTransform, time: 1 },
      { delta: shiftDown, time: 1 },
      { delta: shiftDown, time: 0.5 },
      { delta: rotateLeft, time: 0.5, flashKeys: ["up"] },
      { delta: shiftDown, time: 1 },
      { delta: shiftDown, time: 0.5 },
      { delta: rotateLeft, time: 0.5, flashKeys: ["up"] },
      { delta: shiftDown, time: 1 },
    ],
  }),
  slide: boardFromFrame({
    boardData: boardData,
    pieceData: [
      { delta: noopTransform, time: 1 },
      { delta: shiftDown, time: 1 },
      { delta: shiftDown, time: 0.5 },
      { delta: shiftLeft, time: 0.5, flashKeys: ["left"] },
      { delta: shiftDown, time: 1 },
      { delta: shiftDown, time: 0.5 },
      { delta: shiftRight, time: 0.5, flashKeys: ["right"] },
      { delta: shiftDown, time: 1 },
    ],
  }),
  drop: boardFromFrame({
    boardData: boardData,
    pieceData: [
      { delta: noopTransform, time: 1 },
      { delta: shiftDown, time: 1 },
      { delta: shiftDown, time: 0.5 },
      { delta: shiftDown, time: 0.5, flashKeys: ["down"] },
      { delta: shiftDown, time: 1 },
      { delta: shiftDown, time: 0.5 },
      { delta: droppedPiece, time: 1.5, flashKeys: ["space"] },
    ],
  }),
  rgb: [{ boardData: buildRgb(), flashKeys: [], time: 1 }],
  mixing: buildMixing(),
  dropMix: buildDropMix([
    [red, blue],
    [green, red],
    [blue, yellow],
  ]),
  dropBlock: buildDropMix(
    [
      [green, green],
      [red, yellow],
      [blue, white],
    ],
    2
  ),
  completeLine: buildCompleteLine(),
}
