import { Image, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/typography';

interface AvatarProps {
  /** Image URI — falls back to initials if empty */
  uri?: string | null;
  /** Display name for generating initials */
  name?: string;
  /** Size in pixels — defaults to 40 */
  size?: number;
  /** Additional container style */
  style?: ViewStyle;
}

/**
 * Themed Avatar component with image or initials fallback.
 *
 * Usage:
 *   <Avatar uri="https://example.com/photo.jpg" name="John Doe" />
 *   <Avatar name="Jane Smith" size={60} />
 *   <Avatar size={32} />
 */
export function Avatar({ uri, name, size = 40, style }: AvatarProps) {
  const { colors } = useTheme();

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  if (uri) {
    return (
      <View style={[containerStyle, style]}>
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View style={[containerStyle, style]}>
      <Text
        style={[
          Typography.caption,
          {
            color: colors.primary,
            fontSize: size * 0.38,
            fontWeight: '600',
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}
