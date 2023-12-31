export type ColorData = [boolean, boolean, boolean]

export type RowData = Array<ColorData>

export type BoardData = Array<RowData>

export type BoardAssignment = {
  x: number
  y: number
  color: ColorData
}
