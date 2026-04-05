import { useContext } from 'react';

import { ThemeContext, type ThemeContextValue } from '@/theme/ThemeContext';

/**
 * Access the current theme.
 *
 * Usage:
 *   const { colors, isDark, setColorScheme, spacing } = useTheme();
 */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
