import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { zustandStorage } from '../utils/storage';

interface AppState {
  /** User's theme preference: 'light', 'dark', or 'system' (follows device) */
  colorScheme: 'light' | 'dark' | 'system';
  /** Whether the user has completed onboarding */
  isOnboarded: boolean;

  setColorScheme: (scheme: 'light' | 'dark' | 'system') => void;
  setOnboarded: (value: boolean) => void;
}

/**
 * Global app store — persisted to MMKV.
 *
 * Usage:
 *   const { colorScheme, setColorScheme } = useAppStore();
 */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      colorScheme: 'system',
      isOnboarded: false,

      setColorScheme: (scheme) => set({ colorScheme: scheme }),
      setOnboarded: (value) => set({ isOnboarded: value }),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
