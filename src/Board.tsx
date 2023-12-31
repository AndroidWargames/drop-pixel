import { BlockRow } from "./BlockRow"
import { useEffect } from "react"
import { boardWidth, boardHeight } from "./constants"
import { black } from "./Colors"
import { useGameContext } from "./GameContext"
import {FallingPieceController} from "./types"

const style = {
  display: "inline-grid",
  gridTemplateColumns: Array(boardWidth).fill("auto").join(" ")
}

const executeCommand = (controller: FallingPieceController) => {
  const commands: Record<string, () => void> = {
    a: controller.rotateLeft,
    d: controller.rotateRight,
    s: controller.rotateRed,
    w: controller.rotateBlue,
    ArrowLeft: controller.shiftLeft,
    ArrowRight: controller.shiftRight,
    ArrowDown: controller.shiftDown,
  }
  return (event: KeyboardEvent) => {
    if (Object.keys(commands).indexOf(event.key) >= 0) {
      commands[event.key]()
    } else {
      console.log(event.key)
      console.log(Object.keys(commands))
    }
  }
}

export const Board = () => {
  const { board, fallingPieceController } = useGameContext()
  const execute = executeCommand(fallingPieceController)

  useEffect(() => {
    
    const handlekeydownEvent = (event: KeyboardEvent) => {
      execute(event)
    }

    document.addEventListener('keyup', handlekeydownEvent)
    return () => {
      document.removeEventListener('keyup', handlekeydownEvent)
    }
  }, [fallingPieceController])

  return (
    <div style={style} className="Board">
      
      {board.map((row, i) => <BlockRow key={i} y={i} rowColors={row}/>)}
    </div>
  )
}

