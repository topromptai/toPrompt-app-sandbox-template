import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { SafeScreen } from '@/components/common/SafeScreen';
import { Spacer } from '@/components/common/Spacer';
import { Text } from '@/components/common/Text';
import { Divider } from '@/components/layout/Divider';
import { Row } from '@/components/layout/Row';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/spacing';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeScreen scroll>
      <Spacer size="xl" />

      <Text variant="h1">Expo Boilerplate</Text>
      <Spacer size="sm" />
      <Text variant="body1" color={colors.textSecondary}>
        A production-ready starter template with centralized theming, pre-configured packages, and
        reusable components.
      </Text>

      <Spacer size="xl" />
      <Divider />
      <Spacer size="lg" />

      {/* Typography Demo */}
      <Text variant="h4">Typography Presets</Text>
      <Spacer size="md" />
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
      <Spacer size="sm" />
      <Text variant="body1">Body 1 — primary body text</Text>
      <Text variant="body2">Body 2 — secondary body text</Text>
      <Text variant="caption" color={colors.textMuted}>
        Caption — small helper text
      </Text>

      <Spacer size="xl" />
      <Divider />
      <Spacer size="lg" />

      {/* Button Demo */}
      <Text variant="h4">Button Variants</Text>
      <Spacer size="md" />
      <View style={styles.buttonGroup}>
        <Button title="Primary" onPress={() => {}} />
        <Spacer size="sm" />
        <Button title="Secondary" variant="secondary" onPress={() => {}} />
        <Spacer size="sm" />
        <Button title="Outline" variant="outline" onPress={() => {}} />
        <Spacer size="sm" />
        <Button title="Ghost" variant="ghost" onPress={() => {}} />
      </View>

      <Spacer size="xl" />
      <Divider />
      <Spacer size="lg" />

      {/* Button Sizes */}
      <Text variant="h4">Button Sizes</Text>
      <Spacer size="md" />
      <Row gap="sm">
        <Button title="Small" size="sm" onPress={() => {}} />
        <Button title="Medium" size="md" onPress={() => {}} />
        <Button title="Large" size="lg" onPress={() => {}} />
      </Row>

      <Spacer size="xl" />
      <Divider />
      <Spacer size="lg" />

      {/* Input Demo */}
      <Text variant="h4">Input Fields</Text>
      <Spacer size="md" />
      <Input label="Email" placeholder="you@example.com" keyboardType="email-address" />
      <Spacer size="md" />
      <Input label="Password" placeholder="Enter password" secureTextEntry hint="Minimum 8 characters" />
      <Spacer size="md" />
      <Input label="Invalid Field" placeholder="Type here" error="This field is required" />

      <Spacer size="xl" />
      <Divider />
      <Spacer size="lg" />

      {/* Card Demo */}
      <Text variant="h4">Card Component</Text>
      <Spacer size="md" />
      <Card>
        <Text variant="h5">Card Title</Text>
        <Spacer size="xs" />
        <Text variant="body2" color={colors.textSecondary}>
          A themed container with background, border, and platform shadow. Edit colors.ts to change
          the card appearance.
        </Text>
      </Card>

      <Spacer size="3xl" />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    gap: Spacing.xs,
  },
});
