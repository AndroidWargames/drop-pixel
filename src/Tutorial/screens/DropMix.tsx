import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"

export const DropMix = () => {
  const { boardData } = useTutorialFrame("dropMix")

  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="Mixing" />
        <div> Blocks with colors that mix</div>
        <div> pass through one another</div>
      </div>
    </div>
  )
}
