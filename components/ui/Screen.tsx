import { StatusBar } from 'expo-status-bar';
import { RefreshControl, ScrollView, type ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/useTheme';
import { SCREEN_PADDING } from '@/constants/spacing';

interface ScreenProps {
  children: React.ReactNode;
  /** Which edges to apply safe area insets — defaults to ['top'] (tab bar handles bottom) */
  edges?: Edge[];
  /** Wrap content in a ScrollView */
  scroll?: boolean;
  /** Apply default horizontal padding (SCREEN_PADDING) */
  padded?: boolean;
  /** Enable keyboard-aware scrolling — uses KeyboardAwareScrollView from react-native-keyboard-controller.
   *  Auto-scrolls to focused input with native animation. Requires scroll=true. */
  keyboardAvoiding?: boolean;
  /** Show pull-to-refresh indicator (requires scroll=true) */
  refreshing?: boolean;
  /** Pull-to-refresh handler (requires scroll=true) */
  onRefresh?: () => void;
  /** Additional container style */
  style?: ViewStyle;
  /** Additional style for scroll content container */
  contentStyle?: ViewStyle;
  /** Disable default horizontal padding (legacy — prefer padded={false}) */
  noPadding?: boolean;
}

/**
 * Screen wrapper with SafeAreaView + StatusBar + theme background.
 * Every screen should use this instead of raw SafeAreaView.
 *
 * Usage:
 *   <Screen scroll padded>
 *     <Typography variant="h1">Hello</Typography>
 *   </Screen>
 *
 *   <Screen scroll keyboardAvoiding padded>
 *     <Input label="Email" ... />
 *     <Button title="Submit" ... />
 *   </Screen>
 *
 *   <Screen scroll refreshing={isRefreshing} onRefresh={handleRefresh}>
 *     <FlatList ... />
 *   </Screen>
 */
export function Screen({
  children,
  edges = ['top'],
  scroll = false,
  padded,
  keyboardAvoiding = false,
  refreshing = false,
  onRefresh,
  style,
  contentStyle,
  noPadding = false,
}: ScreenProps) {
  const { colors, isDark } = useTheme();

  // Resolve padding: padded=true enables it, noPadding=true disables it, default is padding on
  const shouldPad = padded !== undefined ? padded : !noPadding;

  const scrollContentStyle: ViewStyle[] = [
    { flexGrow: 1 },
    shouldPad ? { paddingHorizontal: SCREEN_PADDING } : {},
    contentStyle ?? {},
  ];

  const refreshControl =
    scroll && onRefresh ? (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={colors.primary}
        colors={[colors.primary]}
      />
    ) : undefined;

  let content: React.ReactNode;

  if (scroll && keyboardAvoiding) {
    // KeyboardAwareScrollView from react-native-keyboard-controller
    // Auto-scrolls to focused TextInput with native-like animation
    content = (
      <KeyboardAwareScrollView
        contentContainerStyle={scrollContentStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={refreshControl}
        bottomOffset={20}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  } else if (scroll) {
    content = (
      <ScrollView
        contentContainerStyle={scrollContentStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={refreshControl}
      >
        {children}
      </ScrollView>
    );
  } else {
    content = children;
  }

  return (
    <SafeAreaView
      edges={edges}
      style={[
        { flex: 1, backgroundColor: colors.background },
        !scroll && shouldPad && { paddingHorizontal: SCREEN_PADDING },
        style,
      ]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {content}
    </SafeAreaView>
  );
}
