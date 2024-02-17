import { ColorData } from "./types"
import { additiveColorToHex, subtractiveColorToHex } from "./Colors"
import { useGameContext } from "./GameContext"
import { boardHeight } from "./constants"

type BlockProperties = {
  color: ColorData
  outline: boolean
  tinge?: ColorData
}

export const Block = ({ color, outline, tinge }: BlockProperties) => {
  const { settings, ghostPiece, pieces } = useGameContext()

  const colorToHex = settings.additiveColor
    ? additiveColorToHex
    : subtractiveColorToHex
  const opacity =
    ((ghostPiece.location.y - pieces.fallingPiece.location.y) * 1.0) /
    boardHeight

  const style = {
    backgroundColor: colorToHex(color, tinge, opacity),
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: outline ? "#999" : "#111",
  }
  return <div style={style} className="Block" />
}
