import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/common/Text';
import { Spacer } from '@/components/common/Spacer';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/spacing';

export default function NotFoundScreen() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text variant="h2">Page Not Found</Text>
        <Spacer size="base" />
        <Link href="/">
          <Text variant="body1" color={colors.primary}>
            Go to Home
          </Text>
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
