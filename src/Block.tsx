import { ColorData } from "./types"
import { colorToHex } from "./Colors"

type BlockProperties = {
  color: ColorData
  outline: boolean
  tinge?: ColorData
}

export const Block = ({ color, outline, tinge }: BlockProperties) => {
  const style = {
    backgroundColor: colorToHex(color, tinge),
    borderStyle: "solid",
    borderColor: outline ? "#999" : "#111",
  }
  return (
    <div style={style} className="Block"/>
  )
}
