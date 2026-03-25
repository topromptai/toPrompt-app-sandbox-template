import { Pressable, StyleSheet, View } from 'react-native';

import { SafeScreen } from '@/components/common/SafeScreen';
import { Spacer } from '@/components/common/Spacer';
import { Text } from '@/components/common/Text';
import { Divider } from '@/components/layout/Divider';
import { Row } from '@/components/layout/Row';
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
    <SafeScreen>
      <Spacer size="xl" />
      <Text variant="h2">Settings</Text>
      <Spacer size="xl" />

      <Text variant="h5">Appearance</Text>
      <Spacer size="md" />
      <Text variant="body2" color={colors.textSecondary}>
        Choose your preferred color scheme. Changes are saved automatically.
      </Text>
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
              <Text
                variant="button"
                color={isSelected ? colors.textInverse : colors.text}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Spacer size="xl" />
      <Divider />
      <Spacer size="lg" />

      <Text variant="h5">About</Text>
      <Spacer size="md" />
      <Row justify="space-between">
        <Text variant="body2" color={colors.textSecondary}>
          Version
        </Text>
        <Text variant="body2">1.0.0</Text>
      </Row>
      <Spacer size="sm" />
      <Row justify="space-between">
        <Text variant="body2" color={colors.textSecondary}>
          SDK
        </Text>
        <Text variant="body2">Expo 54</Text>
      </Row>
    </SafeScreen>
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
