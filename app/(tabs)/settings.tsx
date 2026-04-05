import { Pressable, StyleSheet, View } from 'react-native';

import { Screen, Typography } from '@/components/ui';
import { Spacer } from '@/components/common';
import { Divider, Row } from '@/components/layout';
import { useTheme } from '@/hooks/useTheme';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { useAppStore } from '@/store/useAppStore';

const THEME_OPTIONS = [
  { label: 'Light', value: 'light' as const },
  { label: 'Dark', value: 'dark' as const },
  { label: 'System', value: 'system' as const },
];

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { colorScheme, setColorScheme } = useAppStore();

  return (
    <Screen>
      <Spacer size="xl" />
      <Typography variant="h2">Settings</Typography>
      <Spacer size="xl" />

      <Typography variant="h5">Appearance</Typography>
      <Spacer size="md" />
      <Typography variant="body2" color={colors.textSecondary}>
        Choose your preferred color scheme. Changes are saved automatically.
      </Typography>
      <Spacer size="base" />

      <View style={styles.optionGroup}>
        {THEME_OPTIONS.map((option) => {
          const isSelected = colorScheme === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => setColorScheme(option.value)}
              style={[
                styles.option,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
            >
              <Typography
                variant="button"
                color={isSelected ? colors.textInverse : colors.text}
              >
                {option.label}
              </Typography>
            </Pressable>
          );
        })}
      </View>

      <Spacer size="xl" />
      <Divider />
      <Spacer size="lg" />

      <Typography variant="h5">About</Typography>
      <Spacer size="md" />
      <Row justify="space-between">
        <Typography variant="body2" color={colors.textSecondary}>
          Version
        </Typography>
        <Typography variant="body2">1.0.0</Typography>
      </Row>
      <Spacer size="sm" />
      <Row justify="space-between">
        <Typography variant="body2" color={colors.textSecondary}>
          SDK
        </Typography>
        <Typography variant="body2">Expo 54</Typography>
      </Row>
    </Screen>
  );
}

const styles = StyleSheet.create({
  optionGroup: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  option: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
});
