import { BlockRow } from "./BlockRow"
import { useEffect } from "react"
import { boardWidth } from "./constants"
import { useGameContext } from "./GameContext"
import {FallingPieceController} from "./types"

const style = {
  display: "inline-grid",
  gridTemplateColumns: Array(boardWidth).fill("auto").join(" ")
}

const executeCommand = (controller: FallingPieceController) => {
  const commands: Record<string, () => void> = {
    KeyA: controller.rotateLeft,
    KeyD: controller.rotateRight,
    //s: controller.rotateRed,
    //w: controller.rotateBlue,
    Space: controller.drop,
    ArrowLeft: controller.shiftLeft,
    ArrowRight: controller.shiftRight,
    ArrowDown: controller.shiftDown,
  }
  return (event: KeyboardEvent) => {
    if (Object.keys(commands).indexOf(event.code) >= 0) {
      commands[event.code]()
    } else {
      console.log(event)
    }
  }
}

export const Board = () => {
  const { board, fallingPieceController } = useGameContext()
  const execute = executeCommand(fallingPieceController)

  useEffect(() => {
  const interval = setInterval(fallingPieceController.shiftDown, 500);
    const handlekeydownEvent = (event: KeyboardEvent) => {
      execute(event)
    }

    document.addEventListener('keyup', handlekeydownEvent)
    return () => {
      document.removeEventListener('keyup', handlekeydownEvent)
      clearInterval(interval)
    }
  }, [fallingPieceController])

  return (
    <div style={style} className="Board">
      
      {board.map((row, i) => <BlockRow key={i} y={i} rowColors={row}/>)}
    </div>
  )
}

