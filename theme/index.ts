/**
 * Unified theme export — single import for all design tokens.
 *
 * Usage:
 *   import { Colors, FontFamily, Spacing, Typography } from '@/theme';
 */

export { Colors, DarkColors, LightColors } from '../constants/colors';
export type { ColorScheme, ThemeColors } from '../constants/colors';
export { FontFamily, fontAssets, FontWeight } from '../constants/fonts';
export { BorderRadius, SCREEN_PADDING, Spacing } from '../constants/spacing';
export type { SpacingKey } from '../constants/spacing';
export { Typography } from '../constants/typography';
export type { TypographyVariant } from '../constants/typography';
