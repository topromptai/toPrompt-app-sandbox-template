import {
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/typography';
import { BorderRadius, Spacing } from '@/constants/spacing';

interface ModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Additional content container style */
  style?: ViewStyle;
}

/**
 * Themed Modal component (bottom sheet style).
 *
 * Usage:
 *   <Modal visible={showModal} onClose={() => setShowModal(false)} title="Select Option">
 *     <ListItem title="Option 1" onPress={() => {}} />
 *     <ListItem title="Option 2" onPress={() => {}} />
 *   </Modal>
 */
export function Modal({ visible, onClose, title, children, style }: ModalProps) {
  const { colors } = useTheme();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[
            styles.content,
            {
              backgroundColor: colors.card,
              borderTopLeftRadius: BorderRadius.xl,
              borderTopRightRadius: BorderRadius.xl,
            },
            style,
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Handle bar */}
          <View style={styles.handleBar}>
            <View style={[styles.handle, { backgroundColor: colors.border }]} />
          </View>

          {/* Header */}
          {title && (
            <View style={styles.header}>
              <Text style={[Typography.h4, { color: colors.text, flex: 1 }]}>
                {title}
              </Text>
              <Pressable
                onPress={onClose}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </Pressable>
            </View>
          )}

          {/* Body */}
          <View style={styles.body}>{children}</View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    maxHeight: '80%',
    minHeight: 200,
  },
  handleBar: {
    alignItems: 'center',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  body: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['2xl'],
  },
});
