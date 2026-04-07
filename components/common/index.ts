/**
 * Barrel export for common components.
 *
 * Local implementations: KeyboardSafeView, Spacer, ErrorBoundary
 * Everything else lives in @/components/ui/ — re-exported here for backward compatibility.
 */

// ── Local implementations ──
// KeyboardSafeView removed — react-native-keyboard-controller is NOT Expo Go compatible
// Use KeyboardAvoidingView from 'react-native' instead
export { Spacer } from './Spacer';
export { ErrorBoundary } from './ErrorBoundary';

// ── Re-exports from ui/ (backward compatibility) ──
export { Screen } from '@/components/ui/Screen';
export { Typography } from '@/components/ui/Typography';
export { Typography as Text } from '@/components/ui/Typography';
export { Button } from '@/components/ui/Button';
export { Card } from '@/components/ui/Card';
export { Input } from '@/components/ui/Input';
export { Badge } from '@/components/ui/Badge';
export { Avatar } from '@/components/ui/Avatar';
export { ListItem } from '@/components/ui/ListItem';
export { EmptyState } from '@/components/ui/EmptyState';
export { Modal } from '@/components/ui/Modal';
export { LoadingSpinner } from '@/components/ui/LoadingSpinner';
