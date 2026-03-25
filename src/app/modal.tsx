import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/common/Text';
import { Spacer } from '@/components/common/Spacer';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/spacing';

export default function ModalScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="h2">Modal Screen</Text>
      <Spacer size="base" />
      <Text variant="body1" color={colors.textSecondary} align="center">
        This is an example modal screen. Swipe down or tap below to dismiss.
      </Text>
      <Spacer size="xl" />
      <Link href="/" dismissTo>
        <Text variant="body1" color={colors.primary}>
          Go to Home
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
});
