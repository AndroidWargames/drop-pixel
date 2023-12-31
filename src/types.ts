export type ColorData = [boolean, boolean, boolean]

export type RowData = Array<ColorData>

export type BoardData = Array<RowData>

export type Coordinate = {
  x: number
  y: number
}

export type BoardAssignment = Coordinate & {
  color: ColorData
}

export type Chonk = BoardAssignment

export type Piece = {
  chonks: Chonk[]
  origin: Coordinate
  location: Coordinate
  kind: "s" | "z" | "i" | "j" | "l" | "o"
}

export type FallingPieceController = {
  rotateLeft: () => void
  rotateRight: () => void
  rotateRed: () => void
  rotateBlue: () => void
  shiftLeft: () => void
  shiftRight: () => void
  shiftDown: () => void
}

