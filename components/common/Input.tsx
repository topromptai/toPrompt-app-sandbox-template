import { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { FontFamily } from '@/constants/fonts';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { Text } from './Text';

interface InputProps extends TextInputProps {
  /** Label shown above the input */
  label?: string;
  /** Error message shown below the input */
  error?: string;
  /** Helper text shown below the input (hidden when error is present) */
  hint?: string;
  /** Additional container style */
  containerStyle?: ViewStyle;
}

/**
 * Themed TextInput with label, error, and hint support.
 * Automatically uses correct fonts, colors, and focus states from the theme.
 *
 * Usage:
 *   <Input label="Email" placeholder="you@example.com" />
 *   <Input label="Password" secureTextEntry error="Password is required" />
 */
export function Input({
  label,
  error,
  hint,
  containerStyle,
  style,
  ...rest
}: InputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? colors.error
    : isFocused
      ? colors.primary
      : colors.border;

  return (
    <View style={containerStyle}>
      {label && (
        <Text variant="label" color={error ? colors.error : colors.textSecondary} style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor={colors.textMuted}
        onFocus={(e) => {
          setIsFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          rest.onBlur?.(e);
        }}
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.surface,
            borderColor,
            fontFamily: FontFamily.REGULAR,
          },
          style,
        ]}
        {...rest}
      />
      {error ? (
        <Text variant="caption" color={colors.error} style={styles.helper}>
          {error}
        </Text>
      ) : hint ? (
        <Text variant="caption" color={colors.textMuted} style={styles.helper}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: Spacing.xs,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
  },
  helper: {
    marginTop: Spacing.xs,
  },
});
