import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui';
import { Spacer } from '@/components/common';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/spacing';

export default function ModalScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Typography variant="h2">Modal Screen</Typography>
      <Spacer size="base" />
      <Typography variant="body1" color={colors.textSecondary} align="center">
        This is an example modal screen. Swipe down or tap below to dismiss.
      </Typography>
      <Spacer size="xl" />
      <Link href="/" dismissTo>
        <Typography variant="body1" color={colors.primary}>
          Go to Home
        </Typography>
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
