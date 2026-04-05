import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { Typography as TypographyStyles, type TypographyVariant } from '@/constants/typography';

interface TypographyProps extends RNTextProps {
  /** Typography preset — defaults to 'body1' */
  variant?: TypographyVariant;
  /** Override text color — defaults to theme text color */
  color?: string;
  /** Text alignment */
  align?: TextStyle['textAlign'];
}

/**
 * Themed Typography component — automatically reads from typography.ts and theme colors.
 *
 * Usage:
 *   <Typography variant="h1">Hello World</Typography>
 *   <Typography variant="caption" color={colors.textMuted}>Subtitle</Typography>
 *   <Typography variant="body1" align="center">Centered text</Typography>
 */
export function Typography({ variant = 'body1', color, align, style, ...rest }: TypographyProps) {
  const { colors } = useTheme();

  return (
    <RNText
      style={[TypographyStyles[variant], { color: color ?? colors.text, textAlign: align }, style]}
      {...rest}
    />
  );
}
