import { Ionicons } from '@expo/vector-icons';
import { type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

interface IconProps {
  /** Ionicons icon name */
  name: keyof typeof Ionicons.glyphMap;
  /** Icon size — defaults to 24 */
  size?: number;
  /** Override color — defaults to theme icon color */
  color?: string;
  /** Additional style */
  style?: ViewStyle;
}

/**
 * Unified Icon component using Ionicons.
 *
 * Usage:
 *   import { Icon } from '@/components/ui/Icon';
 *   <Icon name="home-outline" size={24} />
 *   <Icon name="heart" color={colors.error} />
 */
export function Icon({ name, size = 24, color, style }: IconProps) {
  const { colors } = useTheme();
  return <Ionicons name={name} size={size} color={color ?? colors.icon} style={style} />;
}
