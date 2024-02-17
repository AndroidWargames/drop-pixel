import "./App.css"
import { GameProvider } from "./GameContext"
import { Router } from "./Router"

export const App = () => {
  return (
    <div className="App">
      <GameProvider>
        <Router />
      </GameProvider>
    </div>
  )
}
