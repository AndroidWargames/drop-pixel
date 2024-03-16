import { useGameContext } from "../GameContext"
import { SettingsButton } from "../SettingsButton"
import { SettingsHeader } from "../SettingsHeader"
import { SizeProvider } from "../SizeContext"

export const HowToPlay = () => {
  const { settings } = useGameContext()
  const goToMainMenu = () => settings.setView("menu")
  const goToControls = () => settings.setView("controls")
  const goToColors = () => settings.setView("colors")
  const goToObjective = () => settings.setView("objective")

  return (
    <SizeProvider>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <SettingsHeader text="How To Play" />
          <SettingsButton onClick={goToColors}>Colors</SettingsButton>
          <SettingsButton onClick={goToObjective}>Objective</SettingsButton>
          <SettingsButton onClick={goToControls}>Controls</SettingsButton>
          <SettingsButton onClick={goToMainMenu}>Back</SettingsButton>
        </div>
      </div>
    </SizeProvider>
  )
}
