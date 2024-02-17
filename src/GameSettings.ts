export type View = "menu" | "game"

export type GameSettings = {
  triplex: boolean
  additiveColor: boolean
  paused: boolean
  view: View
}

export type GameSettingsHandler = GameSettings & {
  setSettings: (s: Partial<GameSettings>) => void
  setTriplex: (b: boolean) => void
  setAdditiveColor: (b: boolean) => void
  setPaused: (b: boolean) => void
  setView: (v: View) => void
}

export const defaultGameSettings = {
  triplex: false,
  additiveColor: true,
  paused: false,
  view: "menu" as View,
}

export const newHandler = (
  settings: GameSettings,
  setter: (s: GameSettings) => void
): GameSettingsHandler => ({
  ...settings,
  setSettings: (newSettings: Partial<GameSettings>) => setter({ ...settings, ...newSettings}),
  setTriplex: (triplex: boolean) => setter({ ...settings, triplex }),
  setAdditiveColor: (additiveColor: boolean) =>
    setter({ ...settings, additiveColor }),
  setPaused: (paused: boolean) => setter({ ...settings, paused }),
  setView: (view: View) => setter({ ...settings, view }),
})
