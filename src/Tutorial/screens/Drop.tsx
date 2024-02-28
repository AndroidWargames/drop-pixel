import { InlineKey } from "../InlineKey"
import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"

export const Drop = () => {
  const { boardData, flashKeys } = useTutorialFrame("drop")

  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="Drop" />
        <div>
          <span>Go down faster by pressing</span>
          <InlineKey keyType="down" flashKeys={flashKeys} />
        </div>
        <div />

        <div>
          <span>Drop by pressing</span>
          <InlineKey keyType="space" flashKeys={flashKeys} />
        </div>
      </div>
    </div>
  )
}
