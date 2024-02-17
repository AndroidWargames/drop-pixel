import "./App.css"
import { Board } from "./Board"
import { PauseScreen } from "./PauseScreen"
import { SidePanel } from "./SidePanel"

export const Game = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Board />
      <SidePanel />
      <PauseScreen />
    </div>
  )
}
