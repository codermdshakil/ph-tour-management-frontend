import { createContext } from "react"
import type { ThemeProviderState } from "../types/theme.provider.type"

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)