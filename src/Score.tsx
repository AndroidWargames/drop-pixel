import { getLevel, useGameContext } from "./GameContext"

export const Score = () => {
  const { score, lines } = useGameContext()

  return (
    <div className="Score">
      <div>Level: {getLevel(lines) + 1}</div>
      <div>Score: {score}</div>
      <div>Lines: {lines}</div>
    </div>
  )
}
