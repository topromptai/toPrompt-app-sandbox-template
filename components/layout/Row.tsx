import { View, type FlexAlignType, type ViewStyle } from 'react-native';

import { Spacing, type SpacingKey } from '@/constants/spacing';

interface RowProps {
  children: React.ReactNode;
  /** Horizontal alignment — defaults to 'flex-start' */
  justify?: ViewStyle['justifyContent'];
  /** Vertical alignment — defaults to 'center' */
  align?: FlexAlignType;
  /** Gap between items using spacing scale */
  gap?: SpacingKey;
  /** Wrap items to next line */
  wrap?: boolean;
  style?: ViewStyle;
}

/**
 * Horizontal flex row with consistent spacing.
 *
 * Usage:
 *   <Row justify="space-between" gap="sm">
 *     <Text>Left</Text>
 *     <Text>Right</Text>
 *   </Row>
 */
export function Row({
  children,
  justify = 'flex-start',
  align = 'center',
  gap,
  wrap = false,
  style,
}: RowProps) {
  return (
    <View
      style={[
        { flexDirection: 'row', justifyContent: justify, alignItems: align },
        gap && { gap: Spacing[gap] },
        wrap && { flexWrap: 'wrap' },
        style,
      ]}
    >
      {children}
    </View>
  );
}
