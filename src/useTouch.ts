import { useEffect, useState } from "react"

export type Direction = "up" | "down" | "left" | "right" | "drop"

const didMove = (diffX: number, diffY: number) =>
  Math.abs(diffX) > 15 || Math.abs(diffY) > 15

const direction = (diffX: number, diffY: number) => {
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      return "left"
    } else {
      return "right"
    }
  } else {
    if (diffY > 0) {
      return "up"
    } else {
      return "down"
    }
  }
}

export const useTouch = <TElement extends HTMLElement>(
  commandInterpreter: (d: Direction) => void
) => {
  const [startPoint, setStartPoint] = useState<Touch | null>(null)
  const [endPoint, setEndPoint] = useState<Touch | null>(null)
  const [lastTap, setLastTap] = useState(false)
  const [lastTapTime, setLastTapTime] = useState<Date>(new Date(0))

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartPoint(e.touches[0])
    }
    const handleTouchMove = (e: TouchEvent) => {
      setEndPoint(e.touches[0])
    }

    const handleTouchEnd = (e: TouchEvent) => {
      let moved = false
      let diffX: number = 0
      let diffY: number = 0

      if (endPoint && startPoint) {
        diffX = startPoint?.clientX - endPoint?.clientX
        diffY = startPoint?.clientY - endPoint?.clientY
        moved = didMove(diffX, diffY)
      }

      if (moved) {
        console.log({ diffX, diffY })
        commandInterpreter(direction(diffX, diffY))
        setLastTap(false)
      } else {
        console.log("tappy")
        if (!!lastTap && new Date().getTime() - lastTapTime.getTime() < 300) {
          commandInterpreter("drop")
          setLastTapTime(new Date(0))
          setLastTap(false)
        } else {
          console.log({ lastTap, lastTapTime })
          setLastTap(true)
          setLastTapTime(new Date())
        }
      }
      setEndPoint(null)
      setStartPoint(null)
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchend", handleTouchEnd)
    document.addEventListener("touchmove", handleTouchMove)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [commandInterpreter])
}
