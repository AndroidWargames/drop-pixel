import { useGameContext } from "./GameContext"
import { PauseButton } from "./PauseButton"
import { PieceQueue } from "./PieceQueue"
import { Score } from "./Score"

export const SidePanel = () => {
  const {
    settings: { paused },
  } = useGameContext()

  return (
    <div className="SidePanel">
      <PieceQueue />
      <div style={{ flex: 1 }} />
      {!paused && <PauseButton />}
      <Score />
    </div>
  )
}
