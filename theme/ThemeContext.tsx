import React, { createContext, useMemo } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

import { Colors, type ThemeColors } from '@/constants/Colors';
import { FontFamily, FontWeight } from '@/constants/fonts';
import { BorderRadius, SCREEN_PADDING, Spacing } from '@/constants/spacing';
import { Typography } from '@/constants/typography';
import { useAppStore } from '@/store/useAppStore';

export interface ThemeContextValue {
  colors: ThemeColors;
  fonts: typeof FontFamily;
  fontWeight: typeof FontWeight;
  spacing: typeof Spacing;
  borderRadius: typeof BorderRadius;
  screenPadding: number;
  typography: typeof Typography;
  isDark: boolean;
  colorScheme: 'light' | 'dark';
  setColorScheme: (scheme: 'light' | 'dark' | 'system') => void;
}

// Default value ensures components don't crash if they render before
// ThemeProvider mounts (e.g., during Expo Router transitions or Fast Refresh).
const defaultTheme: ThemeContextValue = {
  colors: Colors.light,
  fonts: FontFamily,
  fontWeight: FontWeight,
  spacing: Spacing,
  borderRadius: BorderRadius,
  screenPadding: SCREEN_PADDING,
  typography: Typography,
  isDark: false,
  colorScheme: 'light',
  setColorScheme: () => {},
};

export const ThemeContext = createContext<ThemeContextValue>(defaultTheme);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemScheme = useSystemColorScheme();
  const { colorScheme: userPreference, setColorScheme } = useAppStore();

  const resolvedScheme = userPreference === 'system' ? (systemScheme ?? 'light') : userPreference;

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: Colors[resolvedScheme],
      fonts: FontFamily,
      fontWeight: FontWeight,
      spacing: Spacing,
      borderRadius: BorderRadius,
      screenPadding: SCREEN_PADDING,
      typography: Typography,
      isDark: resolvedScheme === 'dark',
      colorScheme: resolvedScheme,
      setColorScheme,
    }),
    [resolvedScheme, setColorScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
