import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const DarkenedOverlay = ({ children }: Props) => (
  <div
    style={{
      display: "grid",
      gridTemplateRows: "1fr auto 1fr",
      height: "100vh",
      position: "fixed",
    }}
  >
    <div />
    <div
      style={{
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "10px",
      }}
    >
      {children}
    </div>
    <div />
  </div>
)
