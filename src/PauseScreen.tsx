import { useEffect } from "react"
import { useGameContext } from "./GameContext"
import { B } from "./B"
import { TriplexToggle } from "./TriplexToggle"
import { ColorToggle } from "./ColorToggle"

export const PauseScreen = () => {
  const { resetGame, settings } = useGameContext()

  const unpause = () => {
    if (settings.paused) settings.setPaused(false)
  }

  const restart = () => {
    if (settings.paused) {
      resetGame()
      unpause()
    }
  }

  useEffect(() => {
    const handlekeydownEvent = (event: KeyboardEvent) => {
      const commands: Record<string, () => void> = {
        KeyR: restart,
      }

      if (Object.keys(commands).indexOf(event.code) >= 0 && settings.paused) {
        commands[event.code]()
      }
    }

    document.addEventListener("keyup", handlekeydownEvent)
    return () => {
      document.removeEventListener("keyup", handlekeydownEvent)
    }
  }, [settings.paused])


  if (!settings.paused) return null

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr auto 1fr",
        height: "100vh",
        position: "fixed",
      }}
    >
      <div />
      <div>
        <div className="SettingsButton" onClick={unpause}>
          Un<B>p</B>ause
        </div>
        <TriplexToggle />
        <ColorToggle />
        <div className="SettingsButton" onClick={restart}>
          <B>R</B>estart Game
        </div>
      </div>
      <div />
    </div>
  )
}
