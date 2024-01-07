import { PieceQueue } from "./PieceQueue"
import { Score } from "./Score"
import {Settings} from "./Settings"

export const SidePanel = () => {
  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <PieceQueue />
        <Score />
        <Settings/>
      </div>
    </div>
  )
}
