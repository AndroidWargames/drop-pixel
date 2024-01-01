import {blue, green, magenta, random, red} from "./Colors"
import {boardHeight, boardWidth} from "./constants"
import {Coordinate, Piece, PieceKind} from "./types"

type PieceTemplate = {
  chonkLocations: Coordinate[]
  origin: Coordinate
  location: Coordinate
}

export const generatePiece = (): Piece => {
  const allKinds = ["s", "z", "i", "j", "l", "o"] as PieceKind[]
  const selected = allKinds[Math.floor(Math.random() * (allKinds.length))]
  return generateSpecificPiece(selected)
}

const generateSpecificPiece = (kind: PieceKind): Piece => {
  const template = pieceTemplates[kind]
  return {
    origin: template.origin,
    location: template.location,
    kind: kind,
    chonks: template.chonkLocations.map((l) => ({ ...l, color: random()}))
  }
}

const pieceTemplates: Record<PieceKind, PieceTemplate> = {
  z: {
    chonkLocations: [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 1, y: 1},
      {x: 2, y: 1},
    ],
    origin: {x: 1, y: 1},
    location: {x: 4, y: 0},
  },
  s: {
    chonkLocations: [
      {x: 0, y: 1},
      {x: 1, y: 0},
      {x: 1, y: 1},
      {x: 2, y: 0},
    ],
    origin: {x: 1, y: 1},
    location: {x: 4, y: 0},
  },
  l: {
    chonkLocations: [
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 2, y: 1},
      {x: 2, y: 0},
    ],
    origin: {x: 1, y: 1},
    location: {x: 4, y: 0},
  },
  o: {
    chonkLocations: [
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 2, y: 1},
      {x: 2, y: 0},
    ],
    origin: {x: 0.5, y: 0.5},
    location: {x: 5, y: 0},
  },
  j: {
    chonkLocations: [
      {x: 0, y: 0},
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 2, y: 1},
    ],
    origin: {x: 1, y: 1},
    location: {x: 4, y: 0},
  },
  i: {
    chonkLocations: [
      {x: 0, y: 0},
      {x: 0, y: 1},
      {x: 0, y: 2},
      {x: 0, y: 3},
    ],
    origin: {x: 0.5, y: 1.5},
    location: {x: 5, y: 0},
  },
}
