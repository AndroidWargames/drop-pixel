import { getLevel, useGameContext } from "./GameContext"

export const Score = () => {
  const { score, highScore, lines } = useGameContext()

  return (
    <div className="Score">
      <div>Level: {getLevel(lines) + 1}</div>
      <div>Lines: {lines}</div>
      <div>Score: {score}</div>
      <div>High Score: {highScore}</div>
    </div>
  )
}
