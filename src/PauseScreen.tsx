import {useEffect} from "react"
import { useGameContext } from "./GameContext"

type Props = {
  setPaused: (b: boolean) => void
}

export const PauseScreen = ({ setPaused }: Props) => {
  const { resetGame } = useGameContext()
  const unpause = () => {
    setPaused(false)
  }
  const restart = () => {
    resetGame()
    unpause()
  }
  useEffect(() => {
    const handlekeydownEvent = (event: KeyboardEvent) => {
      if (event.code == "KeyP") {
        unpause()
      }
    }

    document.addEventListener("keyup", handlekeydownEvent)
    return () => {
      document.removeEventListener("keyup", handlekeydownEvent)
    }
  }, [])

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr auto 1fr",
        height: "100vh",
      }}
    >
      <div />
      <div>
        <div className="SettingsButton" onClick={unpause}>
          Continue
        </div>
        <div className="SettingsButton" onClick={restart}>
          Restart Game
        </div>
      </div>
      <div />
    </div>
  )
}
