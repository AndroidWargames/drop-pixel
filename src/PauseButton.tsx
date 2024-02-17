import { B } from "./B"
import { useGameContext } from "./GameContext"

export const ColorToggle = () => {
  const {
    settings: { paused, setPaused },
  } = useGameContext()

  const togglePaused = () => {
    setPaused(!paused)
  }

  return (
    <div className="SettingsButton" onClick={togglePaused}>
      Un<B>p</B>ause
    </div>
  )
}
