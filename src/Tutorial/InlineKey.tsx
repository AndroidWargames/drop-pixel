import {FlashKey} from "./tutorialConstants"

const keys: Record<FlashKey, string> = {
  up: "↑",
  right: "→",
  down: "↓",
  left: "←",
  space: "space",
}

export const InlineKey = ({ keyType, flashKeys }: { keyType: FlashKey, flashKeys: FlashKey[] }) => {
  const className = flashKeys.includes(keyType) ? "blinkyInlineKey" : "InlineKey"
  return (
    <>
      &nbsp;
      <span className={className}>{keys[keyType]}</span>
      &nbsp;
    </>
  )
}
