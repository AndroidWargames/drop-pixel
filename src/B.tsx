import { ReactNode } from "react"

export const B = ({ children }: { children: ReactNode }) => (
  <span className="bold">{children}</span>
)
