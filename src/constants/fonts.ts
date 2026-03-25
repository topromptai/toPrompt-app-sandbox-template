/**
 * Centralized font configuration for the entire app.
 *
 * HOW TO CUSTOMIZE:
 * 1. Replace .ttf files in src/assets/fonts/
 * 2. Update the fontAssets map below to match your new file names
 * 3. Update FontFamily values if your font has different naming
 * 4. All components using typography presets will automatically reflect changes
 */

export const FontFamily = {
  REGULAR: 'Inter-Regular',
  MEDIUM: 'Inter-Medium',
  SEMI_BOLD: 'Inter-SemiBold',
  BOLD: 'Inter-Bold',
} as const;

/**
 * Font assets map — passed directly to expo-font's useFonts() hook.
 * Keys must match the FontFamily values above.
 */
export const fontAssets = {
  [FontFamily.REGULAR]: require('../assets/fonts/Inter-Regular.ttf'),
  [FontFamily.MEDIUM]: require('../assets/fonts/Inter-Medium.ttf'),
  [FontFamily.SEMI_BOLD]: require('../assets/fonts/Inter-SemiBold.ttf'),
  [FontFamily.BOLD]: require('../assets/fonts/Inter-Bold.ttf'),
} as const;

/**
 * Semantic font weight map — use these in typography presets and components.
 */
export const FontWeight = {
  regular: FontFamily.REGULAR,
  medium: FontFamily.MEDIUM,
  semiBold: FontFamily.SEMI_BOLD,
  bold: FontFamily.BOLD,
} as const;
