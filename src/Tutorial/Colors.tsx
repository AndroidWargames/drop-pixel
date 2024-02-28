import { ScreenCycler } from "./ScreenCycler"
import { Mixing } from "./screens/Mixing"
import { Rgb } from "./screens/Rgb"

const screens = [<Rgb />, <Mixing />]

export const Colors = () => {
  return <ScreenCycler screens={screens} />
}
