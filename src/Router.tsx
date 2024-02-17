import { Game } from "./Game"
import { useGameContext } from "./GameContext"
import { MainMenu } from "./MainMenu"

export const Router = () => {
  const { settings } = useGameContext()
  switch (settings.view) {
    case "menu":
      return <MainMenu />
    case "game":
      return <Game />
  }
}
