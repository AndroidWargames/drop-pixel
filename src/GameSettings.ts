export type GameSettings = {
  triplex: boolean
  additiveColor: boolean
}

export type GameSettingsHandler = GameSettings & {
  setTriplex: (b: boolean) => void
  setAdditiveColor: (b: boolean) => void
}

export const defaultGameSettings = {
  triplex: false,
  additiveColor: true,
}

export const newHandler = (
  settings: GameSettings,
  setter: (s: GameSettings) => void
): GameSettingsHandler => ({
  ...settings,
  setTriplex: (triplex: boolean) => setter({ ...settings, triplex }),
  setAdditiveColor: (additiveColor: boolean) =>
    setter({ ...settings, additiveColor }),
})
