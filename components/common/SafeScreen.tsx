import { StatusBar } from 'expo-status-bar';
import { ScrollView, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/useTheme';
import { SCREEN_PADDING } from '@/constants/spacing';

interface SafeScreenProps {
  children: React.ReactNode;
  /** Which edges to apply safe area insets — defaults to ['top', 'bottom'] */
  edges?: Edge[];
  /** Wrap content in a ScrollView */
  scroll?: boolean;
  /** Additional container style */
  style?: ViewStyle;
  /** Disable default horizontal padding */
  noPadding?: boolean;
}

/**
 * Screen wrapper with SafeAreaView + StatusBar + theme background.
 * Every screen should use this instead of raw SafeAreaView.
 *
 * Usage:
 *   <SafeScreen>
 *     <Text variant="h1">Hello</Text>
 *   </SafeScreen>
 *
 *   <SafeScreen scroll edges={['top']}>
 *     {/* scrollable content *\/}
 *   </SafeScreen>
 */
export function SafeScreen({
  children,
  edges = ['top', 'bottom'],
  scroll = false,
  style,
  noPadding = false,
}: SafeScreenProps) {
  const { colors, isDark } = useTheme();

  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[
        { flexGrow: 1 },
        !noPadding && { paddingHorizontal: SCREEN_PADDING },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <SafeAreaView
      edges={edges}
      style={[
        { flex: 1, backgroundColor: colors.background },
        !scroll && !noPadding && { paddingHorizontal: SCREEN_PADDING },
        style,
      ]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {content}
    </SafeAreaView>
  );
}
