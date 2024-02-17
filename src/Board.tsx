import { useEffect } from "react"
import { getTimeOut, useGameContext } from "./GameContext"
import { FallingPieceController } from "./types"
import { absoluteChonks } from "./FallingPieceController"
import { any } from "./reducers"
import { Display } from "./Display"
import { blue, green, red } from "./Colors"
import { GameSettingsHandler } from "./GameSettings"

const executeCommand = (
  controller: FallingPieceController,
  settings: GameSettingsHandler
) => {
  const commands: Record<string, () => void> = {
    ArrowUp: controller.rotateLeft,
    KeyT: () => settings.setTriplex(!settings.triplex),
    KeyC: () => settings.setAdditiveColor(!settings.additiveColor),
    KeyP: () => settings.setPaused(!settings.paused),
    Space: controller.drop,
    ArrowLeft: controller.shiftLeft,
    ArrowRight: controller.shiftRight,
    ArrowDown: controller.shiftDown,
  }
  return (event: KeyboardEvent) => {
    if (Object.keys(commands).indexOf(event.code) >= 0) {
      commands[event.code]()
    }
  }
}

export const Board = () => {
  const {
    board,
    ghostPiece,
    fallingPieceController,
    settings,
    nextTick,
    setNextTick,
    lines,
  } = useGameContext()
  const execute = executeCommand(fallingPieceController, settings)
  const chonks = absoluteChonks(ghostPiece)
  const outline = (x: number, y: number) =>
    chonks.map((c) => c.x == x && c.y == y).reduce(any)
  const tinge = (x: number, y: number) => {
    const chonk = chonks.find((c) => c.x == x && c.y == y)
    return chonk?.color
  }

  useEffect(() => {
    const handlekeydownEvent = (event: KeyboardEvent) => {
      execute(event)
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
    let to = settings.paused
      ? 99999999999
      : setTimeout(tick(nextTick), nextTick - Date.now())

    return () => {
      clearTimeout(to)
    }
  }, [board, settings.paused])

  const style = {
    backgroundColor: settings.additiveColor ? "#333333" : "#CCCCCC",
  }

  if (settings.triplex) {
    return (
      <div style={style}>
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
      <div style={style}>
        <Display board={board} outline={outline} tinge={tinge} />
      </div>
    )
  }
}
