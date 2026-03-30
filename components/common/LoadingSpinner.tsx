import { ActivityIndicator, StyleSheet, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

interface LoadingSpinnerProps {
  /** Show a full-screen overlay behind the spinner */
  overlay?: boolean;
  /** Spinner size */
  size?: 'small' | 'large';
  /** Additional style */
  style?: ViewStyle;
}

/**
 * Themed loading indicator.
 *
 * Usage:
 *   <LoadingSpinner />
 *   <LoadingSpinner overlay size="large" />
 */
export function LoadingSpinner({ overlay = false, size = 'large', style }: LoadingSpinnerProps) {
  const { colors } = useTheme();

  if (overlay) {
    return (
      <View style={[styles.overlay, { backgroundColor: colors.overlay }, style]}>
        <ActivityIndicator size={size} color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.center, style]}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});
