import "./App.css"
import { Board } from "./Board"
import { GameProvider } from "./GameContext"
import { PauseScreen } from "./PauseScreen"
import { SidePanel } from "./SidePanel"
import { useState } from "react"

export const App = () => {
  return (
    <div className="App">
      <GameProvider>
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
      </GameProvider>
    </div>
  )
}
