import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"

export const DropBlock = () => {
  const { boardData } = useTutorialFrame("dropBlock")

  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="Blocking" />
        <div> Blocks with colors that don't mix</div>
        <div> stop one another </div>
      </div>
    </div>
  )
}
