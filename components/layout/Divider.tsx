import { View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { Spacing, type SpacingKey } from '@/constants/spacing';

interface DividerProps {
  /** Vertical spacing above and below the divider */
  spacing?: SpacingKey;
  /** If true, renders a vertical divider */
  vertical?: boolean;
  style?: ViewStyle;
}

/**
 * Themed horizontal or vertical rule.
 *
 * Usage:
 *   <Divider />
 *   <Divider spacing="lg" />
 *   <Divider vertical />
 */
export function Divider({ spacing = 'sm', vertical = false, style }: DividerProps) {
  const { colors } = useTheme();
  const margin = Spacing[spacing];

  if (vertical) {
    return (
      <View
        style={[
          { width: 1, backgroundColor: colors.divider, marginHorizontal: margin },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        { height: 1, backgroundColor: colors.divider, marginVertical: margin },
        style,
      ]}
    />
  );
}
