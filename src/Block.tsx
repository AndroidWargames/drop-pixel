import { ColorData } from "./types"
import { colorToHex, random } from "./Colors"
import {useGameContext} from "./GameContext"

type BlockProperties = {
  color: ColorData
  x: number
  y: number
}

export const Block = ({color, x, y}: BlockProperties) => {
  const context = useGameContext()
  const click = () => {
    context?.setColor({x, y, color: random()})
  }
  const style = {
    backgroundColor: colorToHex(color),
  }
  return <div style={style} className="Block" onClick={click}> </div>
}
