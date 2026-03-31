/**
 * Centralized color palette for the entire app.
 *
 * HOW TO CUSTOMIZE:
 * 1. Edit the light/dark color values below
 * 2. All components using useTheme() will automatically reflect changes
 * 3. No other files need to be modified
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#ffffff';

export const LightColors = {
  // Brand
  primary: '#0a7ea4',
  primaryLight: '#4da8c4',
  primaryDark: '#065a75',
  secondary: '#6c47ff',
  accent: '#ff6b35',

  // Backgrounds
  background: '#ffffff',
  surface: '#f8f9fa',
  card: '#ffffff',

  // Text
  text: '#11181C',
  textSecondary: '#687076',
  textMuted: '#9BA1A6',
  textInverse: '#ffffff',

  // Borders & Dividers
  border: '#e1e4e8',
  divider: '#f0f0f0',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Status
  success: '#2da44e',
  warning: '#d29922',
  error: '#cf222e',
  info: '#0969da',

  // Interactive
  link: '#0969da',
  inputBackground: '#f8f9fa',
  inputBorder: '#d0d7de',
  placeholder: '#9BA1A6',

  // Navigation
  tint: tintColorLight,
  tabIconDefault: '#687076',
  tabIconSelected: tintColorLight,
  icon: '#687076',
};

export const DarkColors: typeof LightColors = {
  // Brand
  primary: '#4da8c4',
  primaryLight: '#7fc4d8',
  primaryDark: '#0a7ea4',
  secondary: '#9b7fff',
  accent: '#ff8c5c',

  // Backgrounds
  background: '#151718',
  surface: '#1e2022',
  card: '#252729',

  // Text
  text: '#ECEDEE',
  textSecondary: '#9BA1A6',
  textMuted: '#687076',
  textInverse: '#11181C',

  // Borders & Dividers
  border: '#2d3134',
  divider: '#252729',
  overlay: 'rgba(0, 0, 0, 0.7)',

  // Status
  success: '#3fb950',
  warning: '#d29922',
  error: '#f85149',
  info: '#58a6ff',

  // Interactive
  link: '#58a6ff',
  inputBackground: '#1e2022',
  inputBorder: '#3d4144',
  placeholder: '#687076',

  // Navigation
  tint: tintColorDark,
  tabIconDefault: '#9BA1A6',
  tabIconSelected: tintColorDark,
  icon: '#9BA1A6',
};

export const Colors = {
  light: LightColors,
  dark: DarkColors,
} as const;

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof LightColors;
