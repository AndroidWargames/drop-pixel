import { Game } from "./Game"
import { useGameContext } from "./GameContext"
import { HowToPlay } from "./Tutorial/HowToPlay"
import { MainMenu } from "./MainMenu"
import { Controls } from "./Tutorial/Controls"
import { Colors } from "./Tutorial/Colors"
import {Objective} from "./Tutorial/Objective"

export const Router = () => {
  const { settings } = useGameContext()
  switch (settings.view) {
    case "menu":
      return <MainMenu />
    case "game":
      return <Game />
    case "tutorial":
      return <HowToPlay />
    case "controls":
      return <Controls />
    case "colors":
      return <Colors />
    case "objective":
      return <Objective />
  }
}
