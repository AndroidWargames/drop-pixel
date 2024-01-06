import { ColorData } from "./types"
import { colorToHex } from "./Colors"

type BlockProperties = {
  color: ColorData
  x: number
  y: number
}

export const Block = ({ color }: BlockProperties) => {
  const style = {
    backgroundColor: colorToHex(color),
  }
  return (
    <div style={style} className="Block">
      {" "}
    </div>
  )
}
