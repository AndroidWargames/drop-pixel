export type GameSettings = {
  triplex: boolean
}

export type GameSettingsHandler = GameSettings & {
  setTriplex: (b: boolean) => void
}

export const defaultGameSettings = {
  triplex: true
}

export const newHandler = (settings: GameSettings, setter: (s: GameSettings) => void): GameSettingsHandler => (
  {
    ...settings,
    setTriplex: (triplex: boolean) => setter({...settings, triplex})
  }
)
