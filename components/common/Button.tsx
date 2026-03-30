import * as Haptics from 'expo-haptics';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/typography';
import { BorderRadius, Spacing } from '@/constants/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  /** Button label text */
  title: string;
  /** Press handler */
  onPress: () => void;
  /** Visual variant — defaults to 'primary' */
  variant?: ButtonVariant;
  /** Size — defaults to 'md' */
  size?: ButtonSize;
  /** Show loading spinner instead of text */
  loading?: boolean;
  /** Disable interaction */
  disabled?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Additional container style */
  style?: ViewStyle;
}

const SIZE_STYLES: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number }> = {
  sm: { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md },
  md: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.base },
  lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },
};

/**
 * Themed Button component — reads colors from theme automatically.
 *
 * Usage:
 *   <Button title="Submit" onPress={handleSubmit} />
 *   <Button title="Cancel" variant="outline" onPress={handleCancel} />
 *   <Button title="Delete" variant="ghost" size="sm" onPress={handleDelete} />
 *   <Button title="Saving..." loading onPress={() => {}} />
 */
export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const { colors } = useTheme();

  const handlePress = () => {
    if (loading || disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      ...SIZE_STYLES[size],
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.sm,
    };

    switch (variant) {
      case 'primary':
        return { ...base, backgroundColor: colors.primary };
      case 'secondary':
        return { ...base, backgroundColor: colors.secondary };
      case 'outline':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.primary,
        };
      case 'ghost':
        return { ...base, backgroundColor: 'transparent' };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return colors.textInverse;
      case 'outline':
      case 'ghost':
        return colors.primary;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        getContainerStyle(),
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text style={[Typography.button, { color: getTextColor() }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
