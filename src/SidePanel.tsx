import { useGameContext } from "./GameContext"
import { PauseButton } from "./PauseButton"
import { PieceQueue } from "./PieceQueue"
import { Score } from "./Score"
import {useSizeContext} from "./SizeContext"

export const SidePanel = () => {
  const {
    settings: { paused },
  } = useGameContext()
  const { gapSize } = useSizeContext()
  const gap = `${gapSize * 2}px` 

  return (
  <div className="SidePanel" style={{padding: gap}}>
      <PieceQueue />
      <div style={{ flex: 1 }} />
      {!paused && <PauseButton />}
      <Score />
    </div>
  )
}
