import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"

export const CompleteLine = () => {
  const { boardData } = useTutorialFrame("completeLine")

  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="Clear Lines" />
        <div>Clear lines by creating a row</div>
        <div>of all white blocks</div>
      </div>
    </div>
  )
}
