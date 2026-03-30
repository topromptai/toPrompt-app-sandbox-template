/**
 * Centralized typography presets for the entire app.
 *
 * HOW TO CUSTOMIZE:
 * 1. Adjust font sizes, line heights, or letter spacing below
 * 2. These presets are used by <Text variant="h1"> automatically
 * 3. Font families come from fonts.ts — change fonts there, not here
 */

import { StyleSheet } from 'react-native';

import { FontFamily } from './fonts';

export const Typography = StyleSheet.create({
  h1: {
    fontFamily: FontFamily.BOLD,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: FontFamily.BOLD,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: FontFamily.SEMI_BOLD,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: FontFamily.SEMI_BOLD,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },
  h5: {
    fontFamily: FontFamily.MEDIUM,
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0,
  },
  h6: {
    fontFamily: FontFamily.MEDIUM,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  subtitle1: {
    fontFamily: FontFamily.MEDIUM,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontFamily: FontFamily.MEDIUM,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  body1: {
    fontFamily: FontFamily.REGULAR,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  body2: {
    fontFamily: FontFamily.REGULAR,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: FontFamily.REGULAR,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  overline: {
    fontFamily: FontFamily.MEDIUM,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
  },
  button: {
    fontFamily: FontFamily.SEMI_BOLD,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  label: {
    fontFamily: FontFamily.MEDIUM,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
});

export type TypographyVariant = keyof typeof Typography;
