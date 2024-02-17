import { B } from "./B"
import { useGameContext } from "./GameContext"
import { SettingsButton } from "./SettingsButton"

export const TriplexToggle = () => {
  const {
    settings: { triplex, setTriplex },
  } = useGameContext()

  const toggleTriplex = () => {
    setTriplex(!triplex)
  }

  return (
    <SettingsButton onClick={toggleTriplex}>
      <B>T</B>oggle <B>T</B>riplex
    </SettingsButton>
  )
}
