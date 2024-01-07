import "./App.css"
import { Board } from "./Board"
import { GameProvider } from "./GameContext"
import { SidePanel } from "./SidePanel"

function App() {
  return (
    <div className="App">
      <GameProvider>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Board />
          <SidePanel />
        </div>
      </GameProvider>
    </div>
  )
}

export default App
