import { B } from "./B"
import { useGameContext } from "./GameContext"

export const ColorToggle = () => {
  const {
    settings: { additiveColor, setAdditiveColor },
  } = useGameContext()

  const toggleColor = () => {
    setAdditiveColor(!additiveColor)
  }

  return (
    <div className="SettingsButton" onClick={toggleColor}>
      {additiveColor ? "Additive" : "Subtractive"} <B>C</B>olor
    </div>
  )
}
