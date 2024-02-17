import { ReactNode } from "react"

type Props = {
  onClick: () => void
  children: ReactNode
}

export const SettingsButton = ({ onClick, children }: Props) => (
  <div className="SettingsButton" onClick={onClick}>
    {children}
  </div>
)
