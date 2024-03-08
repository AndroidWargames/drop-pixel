import { useGameContext } from "./GameContext"
import { BoardData, Piece } from "./types"
import { black } from "./Colors"
import { Block } from "./Block"
import { useSizeContext } from "./SizeContext"

const style = {
  display: "inline-grid",
  gridTemplateColumns: Array(3).fill("auto").join(" "),
}

const pieceHeight = (piece: Piece): number => {
  if (piece.kind == "i") return 4
  return 2
}

const pieceGrid = (pieces: Piece[]): BoardData => {
  let size = pieces.map((p) => pieceHeight(p)).reduce((a, b) => a + b) + 2
  if (size == 0) {
    return [[]] as BoardData
  }
  let data = Array.from({ length: size }, () =>
    Array.from({ length: 3 }, () => black)
  )
  let maxY = 0
  pieces.forEach((piece) => {
    piece.chonks.forEach((chonk) => {
      data[chonk.y + maxY][chonk.x] = chonk.color
    })
    maxY += Math.max(...piece.chonks.map((c) => c.y)) + 2
  })
  return data
}

export const PieceQueue = () => {
  const gap = `${useSizeContext().gapSize}px`
  const PieceDisplay = ({ pieces }: { pieces: Piece[] }) => (
    <div style={{ ...style, gap }} className="Board">
      {pieceGrid(pieces).map((row, y) =>
        row.map((color, x) => (
          <Block key={`${x}${y}`} color={color} outline={false} />
        ))
      )}
    </div>
  )

  const { pieces } = useGameContext()

  return (
    <div>
      <PieceDisplay pieces={pieces.pieceQueue} />
    </div>
  )
}
