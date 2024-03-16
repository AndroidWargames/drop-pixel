import { InlineKey } from "../InlineKey"
import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"
import { useInterfaceContext } from "../../InterfaceContext"

export const Slide = () => {
  const { boardData, flashKeys } = useTutorialFrame("slide")
  const { interfaceKind } = useInterfaceContext()

  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="Slide" />
        {interfaceKind == "web" && (
          <div>
            <span>Move a piece by pressing</span>
            <InlineKey keyType="left" flashKeys={flashKeys} />
            and
            <InlineKey keyType="right" flashKeys={flashKeys} />
          </div>
        )}
        {interfaceKind == "mobile" && (
          <div>
            <div> Move a piece by swiping </div>
            <div> left and right </div>
          </div>
        )}
      </div>
    </div>
  )
}
