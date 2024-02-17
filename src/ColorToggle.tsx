import { B } from "./B"
import { useGameContext } from "./GameContext"
import { SettingsButton } from "./SettingsButton"

export const ColorToggle = () => {
  const {
    settings: { additiveColor, setAdditiveColor },
  } = useGameContext()

  const toggleColor = () => {
    setAdditiveColor(!additiveColor)
  }

  return (
    <SettingsButton onClick={toggleColor}>
      {additiveColor ? "Additive" : "Subtractive"} <B>C</B>olor
    </SettingsButton>
  )
}
