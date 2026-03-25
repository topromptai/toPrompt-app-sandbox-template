import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';

import { LightColors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom fallback UI — receives error and retry callback */
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches JavaScript errors in child component tree and displays a fallback UI.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <MyScreen />
 *   </ErrorBoundary>
 *
 *   <ErrorBoundary fallback={(error, retry) => <CustomError onRetry={retry} />}>
 *     <MyScreen />
 *   </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to your error reporting service here
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // Default fallback UI (uses light colors since theme context may not be available)
      const colors = LightColors;

      return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <RNText style={[styles.emoji]}>⚠️</RNText>
          <RNText style={[styles.title, { color: colors.text }]}>Something went wrong</RNText>
          <RNText style={[styles.message, { color: colors.textSecondary }]}>
            {this.state.error.message}
          </RNText>
          <Pressable
            onPress={this.handleRetry}
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            <RNText style={[styles.buttonText, { color: colors.textInverse }]}>Try Again</RNText>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
  },
  emoji: {
    fontSize: 48,
    marginBottom: Spacing.base,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
