import { ColorData } from "./types"

export const red: ColorData = [true, false, false]
export const yellow: ColorData = [true, true, false]
export const green: ColorData = [false, true, false]
export const cyan: ColorData = [false, true, true]
export const blue: ColorData = [false, false, true]
export const magenta: ColorData = [true, false, true]
export const white: ColorData = [true, true, true]
export const black: ColorData = [false, false, false]
export const all = [red, yellow, green, cyan, blue, magenta, white, black]
export const random = () => (
  all[Math.floor(Math.random() * all.length)]
)

const boolToHex = (b: boolean) => (
  b ? "CC" : "44"
)

export const colorToHex = (color: ColorData) => (
  color.map((v) => boolToHex(v)).join("").padStart(7, "#")
)
