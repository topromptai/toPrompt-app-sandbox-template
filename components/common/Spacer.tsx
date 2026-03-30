import { View } from 'react-native';

import { Spacing, type SpacingKey } from '@/constants/spacing';

interface SpacerProps {
  /** Size from the spacing scale */
  size?: SpacingKey;
  /** If true, adds horizontal space instead of vertical */
  horizontal?: boolean;
}

/**
 * Consistent spacing between elements — reads from spacing.ts scale.
 *
 * Usage:
 *   <Spacer size="lg" />
 *   <Spacer size="sm" horizontal />
 */
export function Spacer({ size = 'base', horizontal = false }: SpacerProps) {
  const value = Spacing[size];
  return <View style={horizontal ? { width: value } : { height: value }} />;
}
