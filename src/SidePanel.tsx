import { PieceQueue } from "./PieceQueue"
import { Score } from "./Score"

export const SidePanel = () => {
  return (
    <div className="SidePanel">
      <PieceQueue />
      <div style={{ flex: 1 }} />
      <Score />
    </div>
  )
}
