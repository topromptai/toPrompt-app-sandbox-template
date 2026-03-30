import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

/**
 * AsyncStorage wrapper — works in Expo Go AND dev client builds.
 *
 * Provides simple get/set/remove helpers so the rest of the app
 * never imports AsyncStorage directly. If you later migrate to MMKV
 * (for a custom dev client), only this file needs to change.
 */
export const storage = {
  getString: async (key: string): Promise<string | null> => {
    return AsyncStorage.getItem(key);
  },
  set: async (key: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(key, value);
  },
  delete: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },
};

/**
 * Zustand persist middleware adapter for AsyncStorage.
 * Plug this into `persist({ storage: createJSONStorage(() => zustandStorage) })`.
 */
export const zustandStorage: StateStorage = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};
