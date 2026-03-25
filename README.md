# Expo Boilerplate

Production-ready Expo SDK 54 starter with centralized theming, pre-configured packages, and reusable components. TypeScript strict mode throughout.

> **Core Principle:** Edit 4 files in `src/constants/` — the entire app updates automatically. No scattered hex codes, no missing font imports, no inconsistent spacing.

---

## Quick Start

```bash
git clone <your-repo-url> my-app
cd my-app
pnpm install
npx expo start
```

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Expo SDK | 54 | Framework (New Architecture + React Compiler) |
| React Native | 0.81.5 | Cross-platform rendering |
| TypeScript | 5.9 | Type safety (strict mode) |
| Expo Router | 6 | File-based navigation (typed routes) |
| Zustand | 5 | State management (persisted) |
| TanStack Query | 5 | Data fetching, caching, sync |
| Axios | 1.7 | HTTP client with auth interceptors |

---

## Architecture

```
Developer edits:                    Consumed by:
+----------------------------+      +-------------------------------------------+
| src/constants/colors.ts    | ---> | ThemeContext -> useTheme() -> all screens  |
| src/constants/fonts.ts     | ---> | useAppFonts() -> root _layout.tsx          |
| src/constants/spacing.ts   | ---> | Spacer, Button, Card, SafeScreen, Input   |
| src/constants/typography.ts| ---> | <Text variant="h1"> auto-styled           |
+----------------------------+      +-------------------------------------------+

Root _layout.tsx provider chain:
  ErrorBoundary -> QueryClientProvider -> ThemeProvider -> Stack
```

**How it flows:**

1. `colors.ts` defines light/dark semantic color tokens
2. `ThemeContext.tsx` reads colors + system preference + user override from Zustand
3. `useTheme()` gives every component the resolved theme
4. Components (`Text`, `Button`, `Input`, `Card`, `SafeScreen`) use theme colors automatically
5. Change `primary` in `colors.ts` → every button, link, accent updates instantly

---

## Customization Guide

### Colors — `src/constants/colors.ts`

```typescript
export const LightColors = {
  primary: '#YOUR_BRAND_COLOR',      // Buttons, links, active states
  primaryLight: '#LIGHTER_VARIANT',
  primaryDark: '#DARKER_VARIANT',
  secondary: '#YOUR_SECONDARY',      // Secondary buttons
  accent: '#YOUR_ACCENT',            // Highlights
  // Background, text, border, status colors...
};
```

Both `LightColors` and `DarkColors` share the same keys. Components auto-switch between them.

### Fonts — `src/constants/fonts.ts` + `src/assets/fonts/`

1. Replace `.ttf` files in `src/assets/fonts/`
2. Update `fonts.ts`:

```typescript
export const FontFamily = {
  REGULAR: 'Poppins-Regular',       // Must match filename without .ttf
  MEDIUM: 'Poppins-Medium',
  SEMI_BOLD: 'Poppins-SemiBold',
  BOLD: 'Poppins-Bold',
} as const;

export const fontAssets = {
  [FontFamily.REGULAR]: require('../assets/fonts/Poppins-Regular.ttf'),
  [FontFamily.MEDIUM]: require('../assets/fonts/Poppins-Medium.ttf'),
  [FontFamily.SEMI_BOLD]: require('../assets/fonts/Poppins-SemiBold.ttf'),
  [FontFamily.BOLD]: require('../assets/fonts/Poppins-Bold.ttf'),
} as const;
```

All `<Text>` and `<Button>` components update automatically.

### Spacing — `src/constants/spacing.ts`

```typescript
export const Spacing = {
  xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24,
  '2xl': 32, '3xl': 40, '4xl': 48, '5xl': 64,
} as const;
```

### Typography — `src/constants/typography.ts`

Adjust font sizes, line heights, letter spacing. The `<Text variant="h1">` component reads directly from this file.

---

## Folder Structure

```
expo-boilerplate/
|-- app.json                         # Expo config (splash, icons, plugins, scheme)
|-- tsconfig.json                    # TypeScript strict, @/* -> ./src/*
|-- package.json                     # Dependencies + scripts
|
|-- src/
|   |-- app/                         # SCREENS (Expo Router file-based)
|   |   |-- _layout.tsx              # Root: ErrorBoundary -> QueryClient -> Theme -> Stack
|   |   |-- +not-found.tsx           # 404 screen
|   |   |-- modal.tsx                # Example modal
|   |   |-- (tabs)/
|   |       |-- _layout.tsx          # Bottom tabs (Home + Settings)
|   |       |-- index.tsx            # Home — component showcase
|   |       |-- settings.tsx         # Settings — theme toggle demo
|   |
|   |-- assets/
|   |   |-- fonts/                   # TTF files (Inter Regular/Medium/SemiBold/Bold)
|   |   |-- images/                  # App icons, splash screen
|   |
|   |-- constants/                   # THE 4 FILES TO EDIT
|   |   |-- colors.ts                # Light/dark color palette
|   |   |-- fonts.ts                 # Font family + asset map
|   |   |-- spacing.ts              # Spacing scale + border radius
|   |   |-- typography.ts           # Text style presets
|   |   |-- index.ts                # Barrel export
|   |
|   |-- theme/                       # Centralized theme system
|   |   |-- ThemeContext.tsx          # Provider: resolves system + user theme
|   |   |-- index.ts                 # Re-exports tokens
|   |
|   |-- components/
|   |   |-- common/                  # THEMED COMPONENTS (use these, not raw RN)
|   |   |   |-- Text.tsx             # <Text variant="h1">
|   |   |   |-- Button.tsx           # <Button variant="primary"> with haptics
|   |   |   |-- Input.tsx            # <Input label="Email" error="Required">
|   |   |   |-- Card.tsx             # <Card> with shadow
|   |   |   |-- SafeScreen.tsx       # SafeArea + StatusBar wrapper
|   |   |   |-- KeyboardSafeView.tsx # Keyboard handling + tap to dismiss
|   |   |   |-- Spacer.tsx           # <Spacer size="md">
|   |   |   |-- LoadingSpinner.tsx   # Themed ActivityIndicator
|   |   |   |-- ErrorBoundary.tsx    # Catches JS errors
|   |   |   |-- index.ts            # Barrel export
|   |   |-- layout/                  # Container, Row, Divider
|   |   |-- ui/                      # IconSymbol, HapticTab, Collapsible, ExternalLink
|   |
|   |-- hooks/                       # useTheme, useAppFonts, useColorScheme
|   |-- services/                    # api.ts (Axios), queryClient.ts (React Query)
|   |-- store/                       # useAppStore.ts (Zustand, persisted)
|   |-- types/                       # api.ts, navigation.ts
|   |-- utils/                       # storage.ts, responsive.ts, platform.ts
```

---

## Pre-built Components

### Text

```tsx
import { Text } from '@/components/common';
<Text variant="h1">Heading</Text>
<Text variant="body1" color={colors.textSecondary}>Subtitle</Text>
```

Variants: `h1` `h2` `h3` `h4` `h5` `h6` `subtitle1` `subtitle2` `body1` `body2` `caption` `overline` `button` `label`

### Button

```tsx
import { Button } from '@/components/common';
<Button title="Submit" onPress={handleSubmit} />
<Button title="Cancel" variant="outline" size="sm" onPress={handleCancel} />
<Button title="Loading..." loading onPress={() => {}} />
<Button title="Submit" fullWidth onPress={handleSubmit} />
```

Variants: `primary` `secondary` `outline` `ghost` | Sizes: `sm` `md` `lg`

### Input

```tsx
import { Input } from '@/components/common';
<Input label="Email" placeholder="you@example.com" keyboardType="email-address" />
<Input label="Password" secureTextEntry error="Password is required" />
<Input label="Bio" hint="Max 200 characters" multiline />
```

### Card

```tsx
import { Card } from '@/components/common';
<Card>
  <Text variant="h5">Title</Text>
  <Text variant="body2">Content with themed shadow.</Text>
</Card>
```

### SafeScreen

```tsx
import { SafeScreen } from '@/components/common';
<SafeScreen scroll>{/* content */}</SafeScreen>
<SafeScreen edges={['top']} noPadding>{/* full-width */}</SafeScreen>
```

### KeyboardSafeView

```tsx
import { KeyboardSafeView } from '@/components/common';
<KeyboardSafeView scroll>
  <Input label="Name" />
  <Button title="Submit" onPress={submit} />
</KeyboardSafeView>
```

---

## Common Tasks

### Add a New Screen

Create `src/app/profile.tsx`:

```tsx
import { SafeScreen, Text, Spacer } from '@/components/common';
import { useTheme } from '@/hooks';

export default function ProfileScreen() {
  const { colors } = useTheme();
  return (
    <SafeScreen scroll>
      <Spacer size="xl" />
      <Text variant="h2">Profile</Text>
    </SafeScreen>
  );
}
```

### Add a New Tab

1. Create `src/app/(tabs)/explore.tsx`
2. Add to `src/app/(tabs)/_layout.tsx`:

```tsx
<Tabs.Screen
  name="explore"
  options={{
    title: 'Explore',
    tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
  }}
/>
```

### Add an API Service

```tsx
// src/services/userService.ts
import { api } from './api';
import type { ApiResponse } from '@/types/api';

interface User { id: string; name: string; email: string; }

export const userService = {
  getProfile: () => api.get<ApiResponse<User>>('/user/profile'),
  updateProfile: (data: Partial<User>) => api.put<ApiResponse<User>>('/user/profile', data),
};
```

### Use React Query

```tsx
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';

const { data, isLoading } = useQuery({
  queryKey: ['profile'],
  queryFn: () => userService.getProfile(),
});
```

### Add a New Zustand Store

```tsx
// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@/utils/storage';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    { name: 'auth-store', storage: createJSONStorage(() => zustandStorage) },
  ),
);
```

### Handle 401 Unauthorized Globally

```tsx
// In your root layout or auth provider:
import { onAuthExpired } from '@/services/api';
import { useRouter } from 'expo-router';

useEffect(() => {
  const unsubscribe = onAuthExpired(() => {
    router.replace('/sign-in');
  });
  return unsubscribe;
}, []);
```

### Add a New Package

```bash
# Expo/RN packages (ensures SDK-compatible version):
npx expo install expo-camera

# Regular packages:
pnpm add lodash && pnpm add -D @types/lodash
```

---

## All Included Packages

### Pre-configured (wired into boilerplate code)

| Package | Purpose | Configured In | Usage |
|---------|---------|---------------|-------|
| `expo-router` | File-based navigation | `src/app/` | Create files in `src/app/` — they become routes automatically |
| `zustand` | State management | `src/store/useAppStore.ts` | `const { colorScheme } = useAppStore()` |
| `@tanstack/react-query` | Data fetching + caching | `src/services/queryClient.ts` + root layout | `useQuery({ queryKey: ['x'], queryFn })` |
| `axios` | HTTP client + auth | `src/services/api.ts` | `api.get('/endpoint')` — auto-attaches auth token |
| `expo-secure-store` | Secure key storage | `src/services/api.ts` | `setAuthToken(token)` / `clearAuthToken()` |
| `expo-font` | Custom font loading | `src/hooks/useAppFonts.ts` | Loaded automatically in root `_layout.tsx` |
| `expo-splash-screen` | Splash screen | `src/app/_layout.tsx` | Auto-hides when fonts finish loading |
| `expo-haptics` | Haptic feedback | `Button.tsx`, `HapticTab.tsx` | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` |
| `@react-native-async-storage` | Local storage | `src/utils/storage.ts` | `zustandStorage` adapter for Zustand persist |
| `expo-status-bar` | Status bar control | `SafeScreen.tsx`, root layout | Auto light/dark via `<StatusBar style="auto">` |
| `expo-constants` | App constants | Available | `Constants.expoConfig?.extra?.apiUrl` |
| `expo-linking` | Deep linking | Expo Router integration | `Linking.openURL('https://...')` |
| `expo-web-browser` | In-app browser | `ExternalLink.tsx` | `openBrowserAsync(url)` |
| `react-native-safe-area-context` | Safe areas | `SafeScreen.tsx` | `<SafeScreen edges={['top']}>` |
| `react-native-screens` | Native screen containers | Expo Router dependency | Automatic — enables native stack performance |

### Available (installed, ready to import)

| Package | Purpose | Usage |
|---------|---------|-------|
| `react-native-reanimated` | Smooth animations | `useSharedValue()`, `useAnimatedStyle()`, `withSpring()` |
| `react-native-gesture-handler` | Touch gestures | `<GestureDetector>`, `Gesture.Pan()`, swipe/pinch/rotate |
| `react-native-svg` | SVG rendering | `<Svg><Circle r={50} fill="red" /></Svg>` |
| `expo-image` | Optimized images | `<Image source={{ uri }} contentFit="cover" />` (replaces RN Image) |
| `expo-linear-gradient` | Gradient backgrounds | `<LinearGradient colors={['#000','#fff']} />` |
| `expo-symbols` | SF Symbols (iOS) | Used by `IconSymbol.ios.tsx` |
| `@react-native-community/datetimepicker` | Date/time picker | `<DateTimePicker mode="date" value={date} onChange={fn} />` |
| `@react-native-picker/picker` | Dropdown select | `<Picker selectedValue={v}><Picker.Item label="A" value="a" /></Picker>` |
| `@expo/vector-icons` | Icon library | `<Ionicons name="home" size={24} />` |
| `react-native-worklets` | Reanimated dependency | Internal — used by reanimated worklets |

---

## Environment Variables

```bash
# .env
EXPO_PUBLIC_API_BASE_URL=https://api.yourapp.com
```

Variables prefixed with `EXPO_PUBLIC_` are accessible via `process.env.EXPO_PUBLIC_*`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm start` | Expo dev server |
| `pnpm ios` | iOS |
| `pnpm android` | Android |
| `pnpm web` | Web |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | Auto-fix lint |
| `pnpm format` | Prettier |
| `pnpm type-check` | TypeScript check |

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| pnpm (not npm) | Faster installs, disk-efficient, strict dependency resolution |
| AsyncStorage (not MMKV) | Works in Expo Go without dev client. Swap to MMKV in `storage.ts` when needed |
| Plain StyleSheet | Zero config, no build plugins, universally understood |
| Zustand (not Redux) | Less boilerplate, built-in persist, simpler API |
| Expo Router (not React Navigation) | File-based routing, type-safe, Expo recommended |
| ErrorBoundary at root | Catches any JS crash, shows retry UI instead of white screen |
| Event-based 401 handling | `onAuthExpired()` decouples API layer from navigation |
