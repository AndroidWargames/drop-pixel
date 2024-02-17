import { B } from "./B"
import { useGameContext } from "./GameContext"

export const TriplexToggle = () => {
  const {
    settings: { triplex, setTriplex },
  } = useGameContext()

  const toggleTriplex = () => {
    setTriplex(!triplex)
  }

  return (
    <div className="SettingsButton" onClick={toggleTriplex}>
      <B>T</B>oggle <B>T</B>riplex
    </div>
  )
}
