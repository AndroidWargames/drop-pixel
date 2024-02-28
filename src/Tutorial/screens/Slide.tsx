import { InlineKey } from "../InlineKey"
import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"

export const Slide = () => {
  const { boardData, flashKeys } = useTutorialFrame("slide")
  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="Slide" />
        <span>Move a piece by pressing</span>
        <InlineKey keyType="left" flashKeys={flashKeys} />
        and
        <InlineKey keyType="right" flashKeys={flashKeys} />
      </div>
    </div>
  )
}
