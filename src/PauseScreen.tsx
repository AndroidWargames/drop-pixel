import { useEffect } from "react"
import { useGameContext } from "./GameContext"
import {B} from "./B"

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
      const commands: Record<string, () => void> = {
        KeyP: unpause,
        KeyR: restart,
      }

      if (Object.keys(commands).indexOf(event.code) >= 0) {
        commands[event.code]()
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
          Un<B>p</B>ause
        </div>
        <div className="SettingsButton" onClick={restart}>
          <B>R</B>estart Game
        </div>
      </div>
      <div />
    </div>
  )
}
