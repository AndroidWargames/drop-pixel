import { InlineKey } from "../InlineKey"
import { SettingsHeader } from "../../SettingsHeader"
import { useTutorialFrame } from "../useTutorialFrame"
import { Display } from "../../Display"
import { useInterfaceContext } from "../../InterfaceContext"

export const Drop = () => {
  const { boardData, flashKeys } = useTutorialFrame("drop")
  const { interfaceKind } = useInterfaceContext()

  return (
    <div>
      <Display board={boardData} />
      <div className="tutorialText">
        <SettingsHeader text="Drop" />
        {interfaceKind == "web" && (
          <div>
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
        )}
        {interfaceKind == "mobile" && (
          <div>
            <div>
              <span>Swip down to go down faster</span>
            </div>
            <div />

            <div>
              <span>Double tap to drop the piece</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
