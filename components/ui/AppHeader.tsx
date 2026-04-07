import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/useTheme';
import { Typography } from './Typography';
import { Spacing, SCREEN_PADDING } from '@/constants/spacing';

interface AppHeaderProps {
  /** Header title text */
  title: string;
  /** Show back arrow button — defaults to true */
  showBack?: boolean;
  /** Custom back handler — defaults to router.back() */
  onBack?: () => void;
  /** Optional element on the right side (e.g., action button, icon) */
  rightElement?: React.ReactNode;
  /** Additional container style */
  style?: ViewStyle;
}

/**
 * Reusable app header with back button, title, and optional right element.
 * Uses theme colors and Typography for consistent styling.
 *
 * Usage:
 *   <AppHeader title="Restaurant Details" />
 *   <AppHeader title="Edit Profile" rightElement={<Button title="Save" onPress={save} size="sm" />} />
 *   <AppHeader title="Settings" showBack={false} />
 */
export function AppHeader({
  title,
  showBack = true,
  onBack,
  rightElement,
  style,
}: AppHeaderProps) {
  const { colors } = useTheme();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }, style]}>
      <View style={styles.leftSection}>
        {showBack && (
          <Pressable
            onPress={handleBack}
            hitSlop={8}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </Pressable>
        )}
      </View>

      <View style={styles.titleSection}>
        <Typography variant="h4" numberOfLines={1} align="center">
          {title}
        </Typography>
      </View>

      <View style={styles.rightSection}>
        {rightElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: SCREEN_PADDING,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: Spacing.xs,
  },
  pressed: {
    opacity: 0.6,
  },
});
