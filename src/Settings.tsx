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
        {!triplex ? "Triplex" : "Untriplex"}
      </div>
      <div className="SettingsButton" onClick={toggleColor}>
        Use {additiveColor ? "Additive" : "Subtractive"} Color
      </div>
    </div>
  )
}
