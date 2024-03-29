import { useEffect } from "react"
import { useGameContext } from "./GameContext"
import { B } from "./B"
import { TriplexToggle } from "./TriplexToggle"
import { ColorToggle } from "./ColorToggle"
import { SettingsButton } from "./SettingsButton"
import { SettingsHeader } from "./SettingsHeader"
import { DarkenedOverlay } from "./DarkenedOverlay"

export const PauseScreen = () => {
  const { resetGame, settings } = useGameContext()

  const unpause = () => {
    settings.setPaused(false)
  }

  const restart = () => {
    resetGame()
    unpause()
  }

  const exit = () => {
    unpause()
    settings.setView("menu")
  }

  useEffect(() => {
    const handlekeydownEvent = (event: KeyboardEvent) => {
      const commands: Record<string, () => void> = {
        KeyR: restart,
        KeyQ: exit,
        Escape: unpause,
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
    <DarkenedOverlay>
      <SettingsHeader text="PAUSED" />
      <SettingsButton onClick={unpause}>
        Un<B>p</B>ause
      </SettingsButton>
      <TriplexToggle />
      <ColorToggle />
      <SettingsButton onClick={restart}>
        <B>R</B>estart Game
      </SettingsButton>
      <SettingsButton onClick={exit}>
        <B>Q</B>uit to Main Menu
      </SettingsButton>
    </DarkenedOverlay>
  )
}
