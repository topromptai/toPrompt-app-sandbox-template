import { View, type ViewStyle } from 'react-native';

import { SCREEN_PADDING } from '@/constants/spacing';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Padded content container with horizontal screen padding.
 */
export function Container({ children, style }: ContainerProps) {
  return (
    <View style={[{ flex: 1, paddingHorizontal: SCREEN_PADDING }, style]}>{children}</View>
  );
}
