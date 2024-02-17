export type GameSettings = {
  triplex: boolean
  additiveColor: boolean
  paused: boolean
}

export type GameSettingsHandler = GameSettings & {
  setTriplex: (b: boolean) => void
  setAdditiveColor: (b: boolean) => void
  setPaused: (b: boolean) => void
}

export const defaultGameSettings = {
  triplex: false,
  additiveColor: true,
  paused: false,
}

export const newHandler = (
  settings: GameSettings,
  setter: (s: GameSettings) => void
): GameSettingsHandler => ({
  ...settings,
  setTriplex: (triplex: boolean) => setter({ ...settings, triplex }),
  setAdditiveColor: (additiveColor: boolean) =>
    setter({ ...settings, additiveColor }),
  setPaused: (paused: boolean) => setter({...settings, paused }),
})
