import { ScreenCycler } from "./ScreenCycler"
import { CompleteLine } from "./screens/CompleteLine"
import { DropMix } from "./screens/DropMix"
import { DropBlock } from "./screens/DropBlock"

const screens = [<DropMix />, <DropBlock />, <CompleteLine />]

export const Objective = () => {
  return <ScreenCycler screens={screens} />
}
