import { useEffect } from "react"
import "./App.css"
import { GameProvider } from "./GameContext"
import { Router } from "./Router"
import { InterfaceProvider } from "./InterfaceContext"

export const App = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "scroll"
    }
  }, [])
  return (
    <div className="App">
      <GameProvider>
        <InterfaceProvider>
          <Router />
        </InterfaceProvider>
      </GameProvider>
    </div>
  )
}
