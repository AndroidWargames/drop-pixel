import { createContext, useContext, useEffect, useState } from "react"

type InterfaceKind = "web" | "mobile"

export type InterfaceContextType = {
  interface: InterfaceKind
}

const defaultContext = {
  interfaceKind: "web",
}

const InterfaceContext = createContext(defaultContext)

export const InterfaceProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [interfaceKind, setInterfaceKind] = useState("web")

  useEffect(() => {
    const handleTouchStart = (_: TouchEvent) => {
      setInterfaceKind("mobile")
    }
    document.addEventListener("touchstart", handleTouchStart)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
    }
  }, [])

  const value = { interfaceKind }
  return <InterfaceContext.Provider value={value}>{children}</InterfaceContext.Provider>
}

export const useInterfaceContext = () => {
  return useContext(InterfaceContext)
}
