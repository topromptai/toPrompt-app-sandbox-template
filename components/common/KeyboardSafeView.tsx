import { type ViewStyle } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller';

interface KeyboardSafeViewProps {
  children: React.ReactNode;
  /** Additional container style */
  style?: ViewStyle;
  /** Extra spacing between keyboard and focused input (default 20) */
  bottomOffset?: number;
  /** Show prev/next/done toolbar above keyboard (default true) */
  showToolbar?: boolean;
}

/**
 * Keyboard-aware wrapper using react-native-keyboard-controller.
 * Automatically scrolls to focused TextInput and keeps it visible.
 *
 * Requires <KeyboardProvider> in root _layout.tsx (already configured).
 *
 * Usage:
 *   <KeyboardSafeView>
 *     <Input label="Name" />
 *     <Input label="Email" />
 *     <Button title="Submit" onPress={submit} />
 *   </KeyboardSafeView>
 */
export function KeyboardSafeView({
  children,
  style,
  bottomOffset = 20,
  showToolbar = true,
}: KeyboardSafeViewProps) {
  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={bottomOffset}
        contentContainerStyle={[{ flexGrow: 1 }, style]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </KeyboardAwareScrollView>
      {showToolbar && <KeyboardToolbar />}
    </>
  );
}
