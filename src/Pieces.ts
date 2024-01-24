import { blue, green, red } from "./Colors"
import { ColorData, Coordinate, Piece, PieceKind } from "./types"

type PieceTemplate = {
  chonkLocations: Coordinate[]
  origin: Coordinate
  location: Coordinate
}

export const newPieceCounts = () => {
  let out: Record<string, number> = {}
  allKinds.forEach((k) => {
    ;["r", "g", "b"].forEach((a) => {
      out[k + a] = 0.0
    })
  })
  return out
}

export const allKinds = ["t", "i", "j", "l", "o"] as PieceKind[]

const inverseSquare = (a: number) => 1.0 / (1 + a) ** 2

type PieceType = {
  kind: PieceKind
  color: ColorData
}

export type PieceCounts = Record<string, number>

const typeFromString = (s: string): PieceType => {
  const kind = s[0] as PieceKind
  const color = {r: red, g: green, b: blue}[s[1]] as ColorData
  return {kind, color}
}

const getPieceType = (counts: Record<string, number>): PieceType => {
  const keys = Object.keys(counts)
  const min = Math.min(...Object.values(counts))
  const inverses = keys.map((k) => inverseSquare(counts[k] - min))
  const sum = inverses.reduce((a, b) => a + b)
  const choose = Math.random() * sum
  let i = 0
  let acc = 0.0
  while (acc < choose) {
    acc += inverses[i]
    i += 1
  }
  return typeFromString(keys[i - 1])
}

export const generatePiece = (counts?: Record<string, number>): Piece => {
  counts = counts || newPieceCounts()
  const pieceType = getPieceType(counts)
  return generateSpecificPiece(pieceType.kind, pieceType.color)
}

const generateSpecificPiece = (kind: PieceKind, color: ColorData): Piece => {
  const template = pieceTemplates[kind]
  return {
    origin: template.origin,
    location: template.location,
    kind: kind,
    chonks: template.chonkLocations.map((l) => ({ ...l, color })),
  }
}

const pieceTemplates: Record<PieceKind, PieceTemplate> = {
  z: {
    chonkLocations: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    origin: { x: 1, y: 1 },
    location: { x: 4, y: 0 },
  },
  s: {
    chonkLocations: [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
    ],
    origin: { x: 1, y: 1 },
    location: { x: 4, y: 0 },
  },
  l: {
    chonkLocations: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 0 },
    ],
    origin: { x: 1, y: 1 },
    location: { x: 3, y: 0 },
  },
  o: {
    chonkLocations: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    origin: { x: 0.5, y: 0.5 },
    location: { x: 4, y: 0 },
  },
  j: {
    chonkLocations: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    origin: { x: 1, y: 1 },
    location: { x: 4, y: 0 },
  },
  i: {
    chonkLocations: [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
    origin: { x: 0.5, y: 1.5 },
    location: { x: 5, y: 0 },
  },
  t: {
    chonkLocations: [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    origin: { x: 1, y: 1 },
    location: { x: 4, y: 0 },
  },
}
