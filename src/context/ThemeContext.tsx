import { createContext, type PropsWithChildren } from 'react'
import { theme, type AppTheme } from '../theme'

export const ThemeContext = createContext<AppTheme | undefined>(undefined)
// The site has a fixed brand theme: no mutable theme state or extra rerenders.
export function ThemeProvider({ children }: PropsWithChildren) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
