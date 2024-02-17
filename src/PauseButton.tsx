import { B } from "./B"
import { useGameContext } from "./GameContext"
import { SettingsButton } from "./SettingsButton"

export const PauseButton = () => {
  const {
    settings: { paused, setPaused },
  } = useGameContext()

  const togglePaused = () => {
    setPaused(!paused)
  }

  if (paused) return null
  return (
    <SettingsButton onClick={togglePaused}>
      <B>P</B>ause
    </SettingsButton>
  )
}
