import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';
import { Button } from './Button';

interface EmptyStateProps {
  /** Icon name (Ionicons) — defaults to 'folder-open-outline' */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Title text */
  title: string;
  /** Description text */
  message?: string;
  /** Optional action button */
  actionLabel?: string;
  /** Action button handler */
  onAction?: () => void;
  /** Additional container style */
  style?: ViewStyle;
}

/**
 * Themed EmptyState component for empty lists, error states, and no-data views.
 *
 * Usage:
 *   <EmptyState title="No items" message="Add your first item to get started" />
 *   <EmptyState
 *     icon="search-outline"
 *     title="No results"
 *     message="Try a different search term"
 *     actionLabel="Clear Search"
 *     onAction={clearSearch}
 *   />
 */
export function EmptyState({
  icon = 'folder-open-outline',
  title,
  message,
  actionLabel,
  onAction,
  style,
}: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconCircle, { backgroundColor: colors.surface }]}>
        <Ionicons name={icon} size={40} color={colors.textMuted} />
      </View>
      <Text style={[Typography.h4, { color: colors.text, textAlign: 'center' }]}>
        {title}
      </Text>
      {message && (
        <Text
          style={[
            Typography.body2,
            { color: colors.textSecondary, textAlign: 'center', maxWidth: 280 },
          ]}
        >
          {message}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button title={actionLabel} onPress={onAction} variant="outline" size="sm" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing['3xl'],
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
});
