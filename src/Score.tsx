import { useGameContext } from "./GameContext"

export const Score = () => {
  const { score, lines } = useGameContext()

  return (
    <div className="Score">
      <div>Score: {score}</div>
      <div>Lines: {lines}</div>
    </div>
  )
}
