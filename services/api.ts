import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Auth event listeners — subscribe to handle 401 (unauthorized) globally.
 *
 * Usage in your root layout or auth context:
 *   useEffect(() => {
 *     const unsubscribe = onAuthExpired(() => {
 *       router.replace('/sign-in');
 *     });
 *     return unsubscribe;
 *   }, []);
 */
type AuthListener = () => void;
const authExpiredListeners = new Set<AuthListener>();

export function onAuthExpired(listener: AuthListener): () => void {
  authExpiredListeners.add(listener);
  return () => authExpiredListeners.delete(listener);
}

function notifyAuthExpired() {
  authExpiredListeners.forEach((listener) => listener());
}

/**
 * Pre-configured Axios instance.
 *
 * - Base URL from EXPO_PUBLIC_API_BASE_URL environment variable
 * - Auth token automatically injected from SecureStore on every request
 * - 401 responses clear the stored token and notify listeners
 * - 15 second timeout
 * - JSON content type
 */
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach auth token from SecureStore
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — handle 401 unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      notifyAuthExpired();
    }
    return Promise.reject(error);
  },
);

/**
 * Store the auth token securely.
 * Call after successful login.
 */
export async function setAuthToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

/**
 * Clear the auth token.
 * Call on logout.
 */
export async function clearAuthToken(): Promise<void> {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}

/**
 * Check if an auth token exists (doesn't validate it).
 */
export async function hasAuthToken(): Promise<boolean> {
  const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  return !!token;
}
