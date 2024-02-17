import { ColorToggle } from "./ColorToggle"
import { TriplexToggle } from "./TriplexToggle"

export const Settings = () => {
  return (
    <div className="Settings">
      <TriplexToggle />
      <ColorToggle />
    </div>
  )
}
