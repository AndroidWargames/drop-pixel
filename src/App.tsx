import "./App.css"
import { GameProvider } from "./GameContext"
import { Router } from "./Router"
import { SizeProvider } from "./SizeContext"

export const App = () => {
  return (
    <div className="App">
      <GameProvider>
        <SizeProvider>
          <Router />
        </SizeProvider>
      </GameProvider>
    </div>
  )
}
