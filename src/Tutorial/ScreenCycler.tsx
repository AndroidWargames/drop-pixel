import { ReactNode, useState } from "react"
import { SettingsButton } from "../SettingsButton"
import { useGameContext } from "../GameContext"

type Props = {
  screens: ReactNode[]
}

export const ScreenCycler = ({ screens }: Props) => {
  const [screenIndex, setScreenIndex] = useState(0)
  const { settings } = useGameContext()
  const child = screens[screenIndex] as ReactNode
  const canPrevious = screenIndex > 0
  const canNext = screenIndex < screens.length - 1
  const backToTutorial = () => settings.setView("tutorial")

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div className="TutorialAnimation">
        {child}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {canPrevious && (
            <SettingsButton onClick={() => setScreenIndex(screenIndex - 1)}>
              Previous
            </SettingsButton>
          )}
          {!canPrevious && (
            <SettingsButton onClick={backToTutorial}>Go Back</SettingsButton>
          )}
          {canNext && (
            <SettingsButton onClick={() => setScreenIndex(screenIndex + 1)}>
              Next
            </SettingsButton>
          )}
          {!canNext && (
            <SettingsButton onClick={backToTutorial}>Done</SettingsButton>
          )}
        </div>
      </div>
    </div>
  )
}
