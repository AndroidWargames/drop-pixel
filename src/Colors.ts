import { ColorData } from "./types"

export const red: ColorData = [true, false, false]
export const yellow: ColorData = [true, true, false]
export const green: ColorData = [false, true, false]
export const cyan: ColorData = [false, true, true]
export const blue: ColorData = [false, false, true]
export const magenta: ColorData = [true, false, true]
export const white: ColorData = [true, true, true]
export const black: ColorData = [false, false, false]
export const all = [red, green, blue, yellow, cyan, magenta, white, black]
export const random = () => all[Math.floor(Math.random() * 3)]

const lit = "CC"
const unlit = "33"

const boolToHex = (b: boolean) => (b ? lit : unlit)
const tingedHex = (bools: boolean[], opacity: number) => {
  const floor = parseInt("33", 16)
  const ceiling = parseInt("CC", 16)
  const dim = Math.floor((ceiling - floor) * opacity ** 0.7 + floor).toString(16)
  const [a, b] = bools
  if (a) { return lit }
  return (b ? dim : unlit)
}

export const subtractiveColorToHex = (color: ColorData, tinge?: ColorData) => {
  const [r, y, b] = sumColors(color, tinge ?? [false, false, false])
    if (r && y && b)
      return "#333333"
    if (r && y)
      return "#CC8833"
    if (r && b)
      return "#8833AA"
    if (y && b)
      return "#33AA33"
    if (y)
      return "#CCCC33"
    if (r)
      return "#EE3344"
    if (b)
      return "#4466DD"
    return "#BBBBBB"
}

export const additiveColorToHex = (color: ColorData, tinge?: ColorData, opacity?: number) => {
  let c
  if (tinge) {
    c = color.map((v, i) => [v, tinge[i]]).map((b) => tingedHex(b, opacity ?? 1))
  } else {
    c = color.map((v) => boolToHex(v))
  }
  return c.join("").padStart(7, "#")
}

export const sumColors = (a: ColorData, b: ColorData) => {
  return a.map((x, i) => x || b[i]) as ColorData
}

export const filterColors = (a: ColorData, b: ColorData) => {
  return a.map((x, i) => x && b[i]) as ColorData
}

const initials = ["r", "g", "b"]

export const colorComponents = (c: ColorData) => {
  let out = [] as string[]
  c.forEach((b, i) => {
    if (b) {
      out.push(initials[i])
    }
  })
  return out
}
