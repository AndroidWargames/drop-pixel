import { PieceQueue } from "./PieceQueue"
import { Score } from "./Score"
import { Settings } from "./Settings"

export const SidePanel = () => {
  return (
    <div className="SidePanel">
      <PieceQueue />
      <div style={{ flex: 1 }} />
      <Score />
      <Settings />
    </div>
  )
}
