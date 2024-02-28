import {useEffect, useState} from "react"
import {TutorialName, tutorialData} from "./tutorialConstants"

export const useTutorialFrame = (name: TutorialName) => {
  const [frameIndex, setFrameIndex] = useState(0)
  const frames = tutorialData[name]

  const frame = frames[frameIndex]

  useEffect(() => {
    const nextIndex = (frameIndex + 1) % frames.length
    const timeout = 800 * frame.time
    const next = setTimeout(() => setFrameIndex(nextIndex), timeout)

    return () => {
      clearTimeout(next)
    }
  }, [frame])

  const value = {
    frame,
    name,
  }

  return frame
}
