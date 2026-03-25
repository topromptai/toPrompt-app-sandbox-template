import { View, StyleSheet, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { BorderRadius, Spacing } from '@/constants/spacing';

interface CardProps {
  children: React.ReactNode;
  /** Additional card style */
  style?: ViewStyle;
  /** Disable default padding */
  noPadding?: boolean;
}

/**
 * Themed card container with background, border, and shadow.
 * Reads colors from theme — edit colors.ts to change card appearance.
 *
 * Usage:
 *   <Card>
 *     <Text variant="h5">Card Title</Text>
 *     <Text variant="body2">Card content here</Text>
 *   </Card>
 */
export function Card({ children, style, noPadding = false }: CardProps) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: isDark ? 'transparent' : '#000',
        },
        !noPadding && styles.padding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Android shadow
    elevation: 2,
  },
  padding: {
    padding: Spacing.base,
  },
});
