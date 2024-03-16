import { GameSettingsHandler } from "./GameSettings"
import { FallingPieceController } from "./types"
import { Direction } from "./useTouch"

export const executeKeyCommand = (
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

export const executeTouchCommand = (controller: FallingPieceController) => {
  const commands: Record<string, () => void> = {
    up: controller.rotateLeft,
    left: controller.shiftLeft,
    right: controller.shiftRight,
    down: controller.shiftDown,
    drop: controller.drop,
  }
  return (direction: Direction) => {
    console.log(direction)
    commands[direction]()
  }
}
