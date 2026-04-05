import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui';
import { Spacer } from '@/components/common';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/spacing';

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Typography variant="h2">Page Not Found</Typography>
        <Spacer size="base" />
        <Link href="/">
          <Typography variant="body1" color={colors.primary}>
            Go to Home
          </Typography>
        </Link>
      </View>
    </>
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
