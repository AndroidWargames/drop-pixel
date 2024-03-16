import { InlineKey } from "../InlineKey"
import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"
import { useInterfaceContext } from "../../InterfaceContext"

export const Rotate = () => {
  const { boardData, flashKeys } = useTutorialFrame("rotate")
  const { interfaceKind } = useInterfaceContext()
  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="Rotate" />
        {interfaceKind == "web" && (
          <div>
            <span>Rotate a piece by pressing</span>
            <InlineKey keyType="up" flashKeys={flashKeys} />
          </div>
        )}
        {interfaceKind == "mobile" && (
          <div>
            <div> Rotate a piece by swiping up </div>
          </div>
        )}
      </div>
    </div>
  )
}
