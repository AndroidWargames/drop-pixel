import { Drop } from "./screens/Drop"
import { Slide } from "./screens/Slide"
import { Rotate } from "./screens/Rotate"
import { ScreenCycler } from "./ScreenCycler"

const screens = [<Slide />, <Rotate />, <Drop />]

export const Controls = () => {
  return <ScreenCycler screens={screens} />
}
