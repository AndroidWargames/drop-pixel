import "./App.css"
import { Board } from "./Board"
import { GameProvider } from "./GameContext"
import { PauseScreen } from "./PauseScreen"
import { SidePanel } from "./SidePanel"
import { useState } from "react"

export const App = () => {
  const [paused, setPaused] = useState(false)
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
          {!paused && (
            <>
              <Board paused={paused} setPaused={setPaused} />
              <SidePanel />
            </>
          )}
          {paused && <PauseScreen setPaused={setPaused} />}
        </div>
      </GameProvider>
    </div>
  )
}
