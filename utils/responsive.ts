import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 14 Pro)
const BASE_WIDTH = 393;

/**
 * Width percentage — returns a value based on screen width.
 * wp(50) = 50% of screen width
 */
export function wp(percentage: number): number {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * percentage) / 100);
}

/**
 * Height percentage — returns a value based on screen height.
 * hp(50) = 50% of screen height
 */
export function hp(percentage: number): number {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * percentage) / 100);
}

/**
 * Normalize a size value based on screen width relative to base design width.
 * Useful for font sizes and icon sizes to scale across devices.
 */
export function normalize(size: number): number {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export { SCREEN_HEIGHT, SCREEN_WIDTH };
