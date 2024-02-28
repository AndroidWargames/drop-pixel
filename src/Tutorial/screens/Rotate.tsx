import { InlineKey } from "../InlineKey"
import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"

export const Rotate = () => {
  const { boardData, flashKeys } = useTutorialFrame("rotate")
  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="Rotate" />
        <span>Rotate a piece by pressing</span>
        <InlineKey keyType="up" flashKeys={flashKeys} />
      </div>
    </div>
  )
}
