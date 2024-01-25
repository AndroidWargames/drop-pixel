import { B } from "./B"
import { useGameContext } from "./GameContext"

export const Settings = () => {
  const {
    settings: { triplex, setTriplex, additiveColor, setAdditiveColor },
  } = useGameContext()

  const toggleTriplex = () => {
    setTriplex(!triplex)
  }

  const toggleColor = () => {
    setAdditiveColor(!additiveColor)
  }

  return (
    <div className="Settings">
      <div className="SettingsButton" onClick={toggleTriplex}>
        <B>T</B>oggle <B>T</B>riplex
      </div>
      <div className="SettingsButton" onClick={toggleColor}>
        {additiveColor ? "Additive" : "Subtractive"} <B>C</B>olor
      </div>
    </div>
  )
}
