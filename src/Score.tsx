import { useEffect, useRef } from "react"
import { getLevel, useGameContext } from "./GameContext"
import { useSizeContext } from "./SizeContext"

export const Score = () => {
  const { score, highScore, lines } = useGameContext()
  const { setScoreWidth, height, width } = useSizeContext()

  const style = highScore == score ? { color: "#DDDD00" } : {}

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) setScoreWidth(ref.current.offsetWidth)
  }, [height, width, ref.current])

  return (
  <div className="Score" ref={ref} style={{textWrap: "nowrap"}}>
      <div>Level: {getLevel(lines) + 1}</div>
      <div>Lines: {lines}</div>
      <div style={style}>
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>
    </div>
  )
}
