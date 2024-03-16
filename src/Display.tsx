import { boardWidth } from "./constants"
import { Block } from "./Block"
import { BoardData, ColorData } from "./types"
import { filterColors } from "./Colors"
import {useSizeContext} from "./SizeContext"

const style = {
  gridTemplateColumns: Array(boardWidth).fill("auto").join(" "),
}

type Props = {
  board: BoardData
  outline?: (x: number, y: number) => boolean
  tinge?: (x: number, y: number) => ColorData | undefined
  colorFilter?: ColorData
}

const filter = (a?: ColorData, b?: ColorData) =>
  a && b ? filterColors(a, b) : a

export const Display = ({ board, outline, tinge, colorFilter }: Props) => {
  const { gapSize } = useSizeContext()
  const gap = `${gapSize}px` 
  const padding = `${gapSize * 2}px` 
  console.log({gapSize})
  return (
  <div style={{...style, gap, padding}} className="Display">
      {board.map((row, y) =>
        row.map((color, x) => (
          <Block
            key={`${x}${y}`}
            color={filter(color, colorFilter) as ColorData}
            tinge={tinge ? filter(tinge(x, y), colorFilter) : undefined}
            outline={outline ? outline(x, y) : false}
          />
        ))
      )}
    </div>
  )
}
