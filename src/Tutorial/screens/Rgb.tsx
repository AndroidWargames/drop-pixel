import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"
import { blue, green, red, additiveColorToHex } from "../../Colors"
import { ColorData } from "../../types"

const style = (c: ColorData) => ({
  color: additiveColorToHex(c),
  fontWeight: "bold",
})

export const Rgb = () => {
  const { boardData } = useTutorialFrame("rgb")

  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="RGB" />
        <div> The game gives you 3 colors of blocks </div>
        <div>
          <span style={style(red)}>Red</span>,{" "}
          <span style={style(green)}>Green</span>, and{" "}
          <span style={style(blue)}>Blue</span>
        </div>
      </div>
    </div>
  )
}
