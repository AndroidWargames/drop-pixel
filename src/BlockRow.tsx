import { RowData } from "./types"
import { Block } from "./Block"

type BlockRowProperties = {
  rowColors: RowData
  y: number
}

export const BlockRow = ({ rowColors, y }: BlockRowProperties) => {
  return (
    <>
      {rowColors.map((color, i) => (
        <Block key={i} x={i} y={y} color={color} />
      ))}
    </>
  )
}
