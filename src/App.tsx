import "./App.css"
import { Board } from "./Board"
import { GameProvider } from "./GameContext"
import { PieceQueue } from "./PieceQueue"

function App() {
  return (
    <div className="App">
      <GameProvider>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Board />
          <PieceQueue />
        </div>
      </GameProvider>
    </div>
  )
}

export default App
