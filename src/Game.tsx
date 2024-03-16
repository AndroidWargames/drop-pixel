import "./App.css"
import { Board } from "./Board"
import { GameOverScreen } from "./GameOverScreen"
import { PauseScreen } from "./PauseScreen"
import { SidePanel } from "./SidePanel"
import { SizeProvider } from "./SizeContext"

export const Game = () => {
  return (
    <SizeProvider>
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
        <GameOverScreen />
      </div>
    </SizeProvider>
  )
}
