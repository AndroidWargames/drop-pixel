import { useEffect } from "react"
import { useGameContext } from "./GameContext"
import { B } from "./B"
import { SettingsButton } from "./SettingsButton"
import { SettingsHeader } from "./SettingsHeader"
import { DarkenedOverlay } from "./DarkenedOverlay"

export const GameOverScreen = () => {
  const { resetGame, settings, gameOver, score, highScore, lines } = useGameContext()

  const restart = () => {
    resetGame()
  }

  const exit = () => {
    settings.setView("menu")
  }

  useEffect(() => {
    const handlekeydownEvent = (event: KeyboardEvent) => {
      const commands: Record<string, () => void> = {
        KeyR: restart,
        KeyQ: exit,
        Escape: exit,
      }

      if (Object.keys(commands).indexOf(event.code) >= 0 && gameOver) {
        commands[event.code]()
      }
    }

    document.addEventListener("keyup", handlekeydownEvent)
    return () => {
      document.removeEventListener("keyup", handlekeydownEvent)
    }
  }, [gameOver])

  if (!gameOver) return null
  const newHigh = highScore == score
  const style = newHigh ? {color: "#DDDD00"} : {}

  return (
    <DarkenedOverlay>
      <SettingsHeader text="GAME OVER" />
      {newHigh && <div className="tutorialText" style={style}>High Score!</div>}
      <div className="tutorialText" style={style}>Score: {score}</div>
      <div className="tutorialText" style={style}>Lines: {lines}</div>
      <SettingsButton onClick={restart}>
        <B>R</B>estart Game
      </SettingsButton>
      <SettingsButton onClick={exit}>
        <B>Q</B>uit to Main Menu
      </SettingsButton>
    </DarkenedOverlay>
  )
}
