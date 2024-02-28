import { useGameContext } from "./GameContext"
import { SettingsButton } from "./SettingsButton"
import { SettingsHeader } from "./SettingsHeader"

export const MainMenu = () => {
  const { resetGame, settings } = useGameContext()
  const startGame = () => {
    resetGame()
    settings.setSettings({ paused: false, view: "game", triplex: false })
  }

  const goToTutorial = () => settings.setView("tutorial")

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <SettingsHeader text="DROP PIXEL" />
        <SettingsButton onClick={startGame}>Start</SettingsButton>
        <SettingsButton onClick={goToTutorial}>How to Play</SettingsButton>
      </div>
    </div>
  )
}
