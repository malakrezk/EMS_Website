import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
export function useAppTheme() {
  const theme = useContext(ThemeContext)
  if (!theme) throw new Error('useAppTheme must be used inside ThemeProvider')
  return theme
}
