import { borderRadius } from './borderRadius'
import { breakpoints } from './breakpoints'
import { colors, paintColors } from './colors'
import { shadows } from './shadows'
import { containers, spacing } from './spacing'
import { transitions } from './transitions'
import { typography } from './typography'
export const theme = { colors, paintColors, typography, spacing, containers, borderRadius, shadows, breakpoints, transitions } as const
export type AppTheme = typeof theme
