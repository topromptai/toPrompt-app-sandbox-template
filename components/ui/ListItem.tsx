import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/typography';
import { Spacing } from '@/constants/spacing';

interface ListItemProps {
  /** Primary text */
  title: string;
  /** Secondary text below title */
  subtitle?: string;
  /** Left icon name (Ionicons) */
  icon?: keyof typeof Ionicons.glyphMap;
  /** Show right chevron arrow */
  showChevron?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Right-side accessory element */
  right?: React.ReactNode;
  /** Additional container style */
  style?: ViewStyle;
}

/**
 * Themed ListItem component for settings, menus, and navigation lists.
 *
 * Usage:
 *   <ListItem title="Profile" icon="person-outline" onPress={goToProfile} showChevron />
 *   <ListItem title="Email" subtitle="john@example.com" icon="mail-outline" />
 *   <ListItem title="Dark Mode" icon="moon-outline" right={<Switch />} />
 */
export function ListItem({
  title,
  subtitle,
  icon,
  showChevron = false,
  onPress,
  right,
  style,
}: ListItemProps) {
  const { colors } = useTheme();

  const content = (
    <View style={[styles.container, { borderBottomColor: colors.divider }, style]}>
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={[Typography.body1, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[Typography.caption, { color: colors.textSecondary }]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {right}
      {showChevron && (
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={title}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: Spacing.md,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
