import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { Typography, type TypographyVariant } from '@/constants/typography';

interface TextProps extends RNTextProps {
  /** Typography preset — defaults to 'body1' */
  variant?: TypographyVariant;
  /** Override text color — defaults to theme text color */
  color?: string;
  /** Text alignment */
  align?: TextStyle['textAlign'];
}

/**
 * Themed Text component — automatically reads from typography.ts and theme colors.
 *
 * Usage:
 *   <Text variant="h1">Hello World</Text>
 *   <Text variant="caption" color={colors.textMuted}>Subtitle</Text>
 *   <Text variant="body1" align="center">Centered text</Text>
 */
export function Text({ variant = 'body1', color, align, style, ...rest }: TextProps) {
  const { colors } = useTheme();

  return (
    <RNText
      style={[Typography[variant], { color: color ?? colors.text, textAlign: align }, style]}
      {...rest}
    />
  );
}
