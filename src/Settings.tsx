import { useGameContext } from "./GameContext"

export const Settings = () => {
  const {
    settings: { triplex, setTriplex },
  } = useGameContext()

  const toggle = () => {
    setTriplex(!triplex)
  }
  return (
    <div className="Settings">
      <div className="SettingsButton" onClick={toggle}>
        Triplex
      </div>
    </div>
  )
}
