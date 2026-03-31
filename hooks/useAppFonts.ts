import { useFonts } from 'expo-font';

import { fontAssets } from '@/constants/fonts';

/**
 * Load custom fonts defined in constants/fonts.ts.
 *
 * Usage in root _layout.tsx:
 *   const [fontsLoaded, fontError] = useAppFonts();
 */
export function useAppFonts() {
  return useFonts(fontAssets);
}
