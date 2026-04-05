import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/typography';
import { BorderRadius, Spacing } from '@/constants/spacing';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';

interface BadgeProps {
  /** Badge label text */
  label: string;
  /** Color variant — defaults to 'default' */
  variant?: BadgeVariant;
  /** Additional container style */
  style?: ViewStyle;
}

/**
 * Themed Badge component for status indicators and labels.
 *
 * Usage:
 *   <Badge label="Active" variant="success" />
 *   <Badge label="Pending" variant="warning" />
 *   <Badge label="3 items" />
 */
export function Badge({ label, variant = 'default', style }: BadgeProps) {
  const { colors } = useTheme();

  const getColors = (): { bg: string; text: string } => {
    switch (variant) {
      case 'success':
        return { bg: colors.success + '20', text: colors.success };
      case 'warning':
        return { bg: colors.warning + '20', text: colors.warning };
      case 'error':
        return { bg: colors.error + '20', text: colors.error };
      case 'info':
        return { bg: colors.info + '20', text: colors.info };
      case 'primary':
        return { bg: colors.primary + '20', text: colors.primary };
      default:
        return { bg: colors.surface, text: colors.textSecondary };
    }
  };

  const { bg, text: textColor } = getColors();

  return (
    <View style={[styles.container, { backgroundColor: bg }, style]}>
      <Text style={[Typography.caption, { color: textColor, fontWeight: '600' }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
});
