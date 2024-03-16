import { useEffect } from "react"
import { getTimeOut, useGameContext } from "./GameContext"
import { executeKeyCommand, executeTouchCommand } from "./executeCommand"
import { absoluteChonks } from "./FallingPieceController"
import { any } from "./reducers"
import { Display } from "./Display"
import { blue, green, red } from "./Colors"
import {useTouch} from "./useTouch"

export const Board = () => {
  const {
    board,
    ghostPiece,
    fallingPieceController,
    settings,
    nextTick,
    setNextTick,
    lines,
    gameOver,
  } = useGameContext()
  const executeKey = executeKeyCommand(fallingPieceController, settings)
  const executeTouch = executeTouchCommand(fallingPieceController)
  const chonks = absoluteChonks(ghostPiece)
  const outline = (x: number, y: number) =>
    chonks.map((c) => c.x == x && c.y == y).reduce(any)
  const tinge = (x: number, y: number) => {
    const chonk = chonks.find((c) => c.x == x && c.y == y)
    return chonk?.color
  }

  useTouch(executeTouch)

  useEffect(() => {
    const handlekeydownEvent = (event: KeyboardEvent) => {
      executeKey(event)
    }

    document.addEventListener("keyup", handlekeydownEvent)
    return () => {
      document.removeEventListener("keyup", handlekeydownEvent)
    }
  }, [fallingPieceController])

  useEffect(() => {
    const tick = (tick: number) => {
      return () => {
        const t = Math.max(tick, Date.now())
        setNextTick(t + getTimeOut(lines))
        fallingPieceController.shiftDown()
      }
    }
    let to = settings.paused || gameOver
      ? 99999999999
      : setTimeout(tick(nextTick), nextTick - Date.now())

    return () => {
      clearTimeout(to)
    }
  }, [board, settings.paused, gameOver])


  if (settings.triplex) {
    return (
      <div >
        {[red, green, blue].map((filter, i) => (
          <Display
            board={board}
            outline={outline}
            tinge={tinge}
            colorFilter={filter}
            key={i}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div >
        <Display board={board} outline={outline} tinge={tinge} />
      </div>
    )
  }
}
