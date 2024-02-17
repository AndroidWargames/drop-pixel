import { useGameContext } from "./GameContext"
import { SettingsButton } from "./SettingsButton"

export const MainMenu = () => {
  const { resetGame, settings } = useGameContext()
  const startGame = () => {
    resetGame()
    settings.setSettings({ paused: false, view: "game", triplex: false })
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SettingsButton onClick={startGame}>Start</SettingsButton>
    </div>
  )
}
