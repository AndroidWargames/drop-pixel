import { ReactNode } from "react"

type Props = {
  text: string
}

export const SettingsHeader = ({ text }: Props) => (
  <div className="SettingsHeader">{text}</div>
)
