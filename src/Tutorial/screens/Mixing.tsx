import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"

import { blue, green, red, cyan, magenta, yellow, additiveColorToHex, white } from "../../Colors"
import { ColorData } from "../../types"

const style = (c: ColorData) => ({
  color: additiveColorToHex(c),
  fontWeight: "bold",
})

export const Mixing = () => {
  const { boardData } = useTutorialFrame("mixing")

  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="Mixing" />
        <div> Colors mix together <a href="https://en.wikipedia.org/wiki/RGB_color_model">additively</a> </div>
        <div> like pixels in your monitor </div>
        <div>&nbsp;</div>
        <div>
          <span style={style(red)}>Red</span>{" and "}
          <span style={style(green)}>Green</span>{" make "}
          <span style={style(yellow)}>Yellow</span>
        </div>
        <div>
          <span style={style(blue)}>Blue</span>{" and "}
          <span style={style(green)}>Green</span>{" make "}
          <span style={style(cyan)}>Cyan</span>
        </div>
        <div>
          <span style={style(red)}>Red</span>{" and "}
          <span style={style(blue)}>Blue</span>{" make "}
          <span style={style(magenta)}>Magenta</span>
        </div>
        <div>
          <span style={style(red)}>Red</span>{" and "}
          <span style={style(green)}>Green</span>{" and "}
          <span style={style(blue)}>Blue</span>{" make "}
          <span style={style(white)}>White</span>
        </div>
      </div>
    </div>
  )
}
