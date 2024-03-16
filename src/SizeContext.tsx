import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { boardHeight, boardWidth } from "./constants"
import { useGameContext } from "./GameContext"
export type SizeContextType = {
  height: number
  width: number
  blockSize: number
  gapSize: number
  setScoreWidth: (s: number) => void
}

const defaultContext = {
  height: 0,
  width: 0,
  blockSize: 25,
  gapSize: 2.5,
  setScoreWidth: (_: number) => {},
}

const SizeContext = createContext<SizeContextType>(defaultContext)

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}

const gapRatio = 0.1

const blockSizeFromDimensions = (
  width: number,
  height: number,
  triplex: boolean
) => {
  const heightInBlocks = boardHeight + 2 + (boardHeight + 1) * gapRatio
  const w = triplex ? boardWidth * 3 : boardWidth
  const widthInBlocks = w  + (w + 9) * gapRatio

  const blockRatio = width / height
  const displayRatio = widthInBlocks / heightInBlocks
  if (blockRatio > displayRatio) {
    return Math.floor(height / heightInBlocks)
  } else {
    return Math.floor(width / widthInBlocks)
  }
}

export const SizeProvider = ({ children }: { children: React.ReactNode }) => {
  const { width, height } = useWindowDimensions()
  const [scoreWidth, setScoreWidth] = useState(0)
  const {
    settings: { triplex },
  } = useGameContext()

  const blockSize = useMemo(
    () => blockSizeFromDimensions(width - scoreWidth, height, triplex),
    [width, height, triplex, scoreWidth]
  )

  const value = {
    blockSize,
    gapSize: Math.floor(blockSize * gapRatio),
    setScoreWidth,
    height,
    width,
  }

  return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>
}

export const useSizeContext = () => {
  return useContext(SizeContext)
}
