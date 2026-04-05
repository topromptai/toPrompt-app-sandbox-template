/**
 * Barrel export for all UI components.
 * This is the PRIMARY import path — all implementations live here.
 *
 * Usage:
 *   import { Screen, Button, Card, Typography } from '@/components/ui';
 *   // OR individual imports:
 *   import { Screen } from '@/components/ui/Screen';
 *   import { Button } from '@/components/ui/Button';
 */

// ── All UI components (implementations) ──
export { Screen } from './Screen';
export { Typography } from './Typography';
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
export { Badge } from './Badge';
export { Avatar } from './Avatar';
export { ListItem } from './ListItem';
export { EmptyState } from './EmptyState';
export { Modal } from './Modal';
export { Icon } from './Icon';
export { LoadingSpinner } from './LoadingSpinner';

// ── Existing UI utilities ──
export { HapticTab } from './HapticTab';
export { Collapsible } from './Collapsible';
export { ExternalLink } from './ExternalLink';
export { IconSymbol } from './IconSymbol';
export { ThemedText } from './ThemedText';
export { ThemedView } from './ThemedView';
