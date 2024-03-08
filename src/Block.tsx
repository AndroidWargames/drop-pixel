import { ColorData } from "./types"
import { additiveColorToHex, subtractiveColorToHex } from "./Colors"
import { useGameContext } from "./GameContext"
import { boardHeight } from "./constants"
import {useSizeContext} from "./SizeContext"

type BlockProperties = {
  color: ColorData
  outline: boolean
  tinge?: ColorData
}

export const Block = ({ color, outline, tinge }: BlockProperties) => {
  const { settings, ghostPiece, pieces } = useGameContext()
  const { blockSize } = useSizeContext()

  const colorToHex = settings.additiveColor
    ? additiveColorToHex
    : subtractiveColorToHex
  const opacity =
    ((ghostPiece.location.y - pieces.fallingPiece.location.y) * 1.0) /
    boardHeight
  const size = `${blockSize}px`

  const style = {
    backgroundColor: colorToHex(color, tinge, opacity),
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: outline ? "#999" : "#111",
    width: size,
    height: size,
  }
  return <div style={style} className="Block" />
}
