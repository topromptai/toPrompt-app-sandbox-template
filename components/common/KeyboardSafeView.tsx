import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  type ViewStyle,
} from 'react-native';

interface KeyboardSafeViewProps {
  children: React.ReactNode;
  /** Additional container style */
  style?: ViewStyle;
  /** Wrap children in a ScrollView that auto-scrolls to focused input */
  scroll?: boolean;
  /** Extra vertical offset for header bars */
  keyboardVerticalOffset?: number;
}

/**
 * Keyboard-aware wrapper that adjusts content when the keyboard appears.
 * Tap outside inputs to dismiss the keyboard.
 *
 * - iOS: uses 'padding' behavior (most reliable)
 * - Android: uses 'height' behavior
 *
 * Usage:
 *   <KeyboardSafeView>
 *     <TextInput placeholder="Name" />
 *     <TextInput placeholder="Email" />
 *   </KeyboardSafeView>
 *
 *   <KeyboardSafeView scroll keyboardVerticalOffset={80}>
 *     {/* Long form with many inputs *\/}
 *   </KeyboardSafeView>
 */
export function KeyboardSafeView({
  children,
  style,
  scroll = false,
  keyboardVerticalOffset = 0,
}: KeyboardSafeViewProps) {
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[{ flex: 1 }, style]}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {content}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
