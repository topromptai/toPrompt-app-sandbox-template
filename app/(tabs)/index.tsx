import { StyleSheet, View } from 'react-native';

import { Button, Card, Input, Screen, Typography } from '@/components/ui';
import { Spacer } from '@/components/common';
import { Divider, Row } from '@/components/layout';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/spacing';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <Screen scroll>
      <Spacer size="xl" />

      <Typography variant="h1">Expo Boilerplate</Typography>
      <Spacer size="sm" />
      <Typography variant="body1" color={colors.textSecondary}>
        A production-ready starter template with centralized theming, pre-configured packages, and
        reusable components.
      </Typography>

      <Spacer size="xl" />
      <Divider />
      <Spacer size="lg" />

      {/* Typography Demo */}
      <Typography variant="h4">Typography Presets</Typography>
      <Spacer size="md" />
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Spacer size="sm" />
      <Typography variant="body1">Body 1 — primary body text</Typography>
      <Typography variant="body2">Body 2 — secondary body text</Typography>
      <Typography variant="caption" color={colors.textMuted}>
        Caption — small helper text
      </Typography>

      <Spacer size="xl" />
      <Divider />
      <Spacer size="lg" />

      {/* Button Demo */}
      <Typography variant="h4">Button Variants</Typography>
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
      <Typography variant="h4">Button Sizes</Typography>
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
      <Typography variant="h4">Input Fields</Typography>
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
      <Typography variant="h4">Card Component</Typography>
      <Spacer size="md" />
      <Card>
        <Typography variant="h5">Card Title</Typography>
        <Spacer size="xs" />
        <Typography variant="body2" color={colors.textSecondary}>
          A themed container with background, border, and platform shadow. Edit colors.ts to change
          the card appearance.
        </Typography>
      </Card>

      <Spacer size="3xl" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    gap: Spacing.xs,
  },
});
