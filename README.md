# Expo Boilerplate

Production-ready Expo SDK 54 starter with centralized theming, pre-configured packages, and reusable components. TypeScript strict mode throughout.

> **Core Principle:** Edit 4 files in `constants/` — the entire app updates automatically. No scattered hex codes, no missing font imports, no inconsistent spacing.

---

## Quick Start

```bash
git clone <your-repo-url> my-app
cd my-app
pnpm install
pnpm start
```

> **Required:** `.npmrc` must be present — it contains `node-linker=hoisted` which is required for pnpm + Expo/Metro to work correctly. Never delete it.

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
| constants/Colors.ts        | ---> | ThemeContext -> useTheme() -> all screens  |
| constants/fonts.ts         | ---> | useAppFonts() -> root _layout.tsx          |
| constants/spacing.ts       | ---> | Spacer, Button, Card, Screen, Input       |
| constants/typography.ts    | ---> | <Text variant="h1"> auto-styled           |
+----------------------------+      +-------------------------------------------+

Root _layout.tsx provider chain:
  ErrorBoundary -> KeyboardProvider -> QueryClientProvider -> ThemeProvider -> Stack
```

**How it flows:**

1. `Colors.ts` defines light/dark semantic color tokens
2. `ThemeContext.tsx` reads colors + system preference + user override from Zustand
3. `useTheme()` gives every component the resolved theme
4. Components (`Typography`, `Button`, `Input`, `Card`, `Screen`) use theme colors automatically
5. Change `primary` in `Colors.ts` → every button, link, accent updates instantly

---

## Customization Guide

### Colors — `constants/Colors.ts`

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

### Fonts — `constants/fonts.ts` + `assets/fonts/`

1. Replace `.ttf` files in `assets/fonts/`
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

### Spacing — `constants/spacing.ts`

```typescript
export const Spacing = {
  xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24,
  '2xl': 32, '3xl': 40, '4xl': 48, '5xl': 64,
} as const;
```

### Typography — `constants/typography.ts`

Adjust font sizes, line heights, letter spacing. The `<Text variant="h1">` component reads directly from this file.

---

## Folder Structure

```
expo-boilerplate/
|-- .npmrc                           # node-linker=hoisted (CRITICAL for pnpm + Expo)
|-- app.json                         # Expo config (splash, icons, plugins, scheme)
|-- metro.config.js                  # Metro bundler — safe pnpm blockList
|-- tsconfig.json                    # TypeScript strict, @/* -> ./*
|-- package.json                     # Dependencies + scripts
|
|-- app/                             # SCREENS (Expo Router file-based)
|   |-- _layout.tsx                  # Root: ErrorBoundary -> QueryClient -> Theme -> Stack
|   |-- +not-found.tsx               # 404 screen
|   |-- modal.tsx                    # Example modal
|   |-- (tabs)/
|       |-- _layout.tsx              # Bottom tabs (Home + Settings)
|       |-- index.tsx                # Home — component showcase
|       |-- settings.tsx             # Settings — theme toggle demo
|
|-- assets/
|   |-- fonts/                       # TTF files (Inter Regular/Medium/SemiBold/Bold)
|   |-- images/                      # App icons, splash screen
|
|-- constants/                       # THE 4 FILES TO EDIT
|   |-- Colors.ts                    # Light/dark color palette
|   |-- fonts.ts                     # Font family + asset map
|   |-- spacing.ts                   # Spacing scale + border radius
|   |-- typography.ts                # Text style presets
|   |-- index.ts                     # Barrel export
|
|-- theme/                           # Centralized theme system
|   |-- ThemeContext.tsx             # Provider: resolves system + user theme
|   |-- index.ts                     # Re-exports tokens
|
|-- components/
|   |-- ui/                          # PRIMARY — all implementations live here
|   |   |-- Screen.tsx               # SafeAreaView + StatusBar (edges defaults to ['top'])
|   |   |-- Typography.tsx           # <Typography variant="h1"> themed text
|   |   |-- Button.tsx               # <Button variant="primary"> with haptics
|   |   |-- Input.tsx                # <Input label="Email" error="Required">
|   |   |-- Card.tsx                 # <Card> with shadow
|   |   |-- Badge.tsx                # <Badge label="Active" variant="success">
|   |   |-- Avatar.tsx               # <Avatar uri={url} name="John">
|   |   |-- ListItem.tsx             # <ListItem title="Profile" icon="person-outline">
|   |   |-- EmptyState.tsx           # <EmptyState title="No items">
|   |   |-- Modal.tsx                # <Modal visible title="Pick"> bottom sheet
|   |   |-- Icon.tsx                 # Ionicons-based icon component
|   |   |-- LoadingSpinner.tsx       # Themed ActivityIndicator
|   |   |-- IconSymbol.tsx           # SF Symbols (iOS) / Material Icons
|   |   |-- HapticTab.tsx            # Tab button with haptic feedback
|   |   |-- Collapsible.tsx          # Expand/collapse section
|   |   |-- ExternalLink.tsx         # In-app browser link
|   |   |-- index.ts                 # Barrel export
|   |-- common/                      # LOCAL EXTRAS + re-exports from ui/
|   |   |-- KeyboardSafeView.tsx     # Keyboard handling + tap to dismiss
|   |   |-- Spacer.tsx               # <Spacer size="md">
|   |   |-- ErrorBoundary.tsx        # Catches JS errors
|   |   |-- index.ts                 # Re-exports Screen, Typography, Button, etc. from ui/
|   |-- layout/                      # Container, Row, Divider
|
|-- hooks/                           # useTheme, useAppFonts, useColorScheme
|-- services/                        # api.ts (Axios), queryClient.ts (React Query)
|-- store/                           # useAppStore.ts (Zustand, persisted)
|-- types/                           # api.ts, navigation.ts
|-- utils/                           # storage.ts, responsive.ts, platform.ts
```

---

## Pre-built Components

> **Import path:** Use `@/components/ui` (primary — all implementations). `@/components/common` re-exports from ui/ for backward compatibility + has KeyboardSafeView, Spacer, ErrorBoundary.

### Screen (wraps SafeAreaView + StatusBar)

Uses `SafeAreaView` from `react-native-safe-area-context` with `edges` control. Defaults to `edges={['top']}` — the tab bar handles bottom safe area, so no extra space above the tab bar.

```tsx
import { Screen } from '@/components/ui/Screen';
<Screen scroll>{/* content */}</Screen>
<Screen edges={['top', 'bottom']} noPadding>{/* full-screen outside tabs */}</Screen>
```

### Typography (themed text with variant presets)

```tsx
import { Typography } from '@/components/ui/Typography';
<Typography variant="h1">Heading</Typography>
<Typography variant="body1" color={colors.textSecondary}>Subtitle</Typography>
```

Variants: `h1` `h2` `h3` `h4` `h5` `h6` `subtitle1` `subtitle2` `body1` `body2` `caption` `overline` `button` `label`

### Button

```tsx
import { Button } from '@/components/ui/Button';
<Button title="Submit" onPress={handleSubmit} />
<Button title="Cancel" variant="outline" size="sm" onPress={handleCancel} />
<Button title="Loading..." loading onPress={() => {}} />
<Button title="Submit" fullWidth onPress={handleSubmit} />
```

Variants: `primary` `secondary` `outline` `ghost` | Sizes: `sm` `md` `lg`

### Input

```tsx
import { Input } from '@/components/ui/Input';
<Input label="Email" placeholder="you@example.com" keyboardType="email-address" />
<Input label="Password" secureTextEntry error="Password is required" />
<Input label="Bio" hint="Max 200 characters" multiline />
```

### Card

```tsx
import { Card } from '@/components/ui/Card';
<Card>
  <Typography variant="h5">Title</Typography>
  <Typography variant="body2">Content with themed shadow.</Typography>
</Card>
```

### Badge

```tsx
import { Badge } from '@/components/ui/Badge';
<Badge label="Active" variant="success" />
<Badge label="Pending" variant="warning" />
<Badge label="3 items" />
```

Variants: `default` `success` `warning` `error` `info` `primary`

### Avatar

```tsx
import { Avatar } from '@/components/ui/Avatar';
<Avatar uri="https://example.com/photo.jpg" name="John Doe" />
<Avatar name="Jane Smith" size={60} />
```

### ListItem

```tsx
import { ListItem } from '@/components/ui/ListItem';
<ListItem title="Profile" icon="person-outline" onPress={goToProfile} showChevron />
<ListItem title="Email" subtitle="john@example.com" icon="mail-outline" />
<ListItem title="Dark Mode" icon="moon-outline" right={<Switch />} />
```

### EmptyState

```tsx
import { EmptyState } from '@/components/ui/EmptyState';
<EmptyState title="No items" message="Add your first item to get started" />
<EmptyState icon="search-outline" title="No results" actionLabel="Clear" onAction={clear} />
```

### Modal

```tsx
import { Modal } from '@/components/ui/Modal';
<Modal visible={show} onClose={() => setShow(false)} title="Select Option">
  <ListItem title="Option 1" onPress={() => {}} />
  <ListItem title="Option 2" onPress={() => {}} />
</Modal>
```

### Icon

```tsx
import { Icon } from '@/components/ui/Icon';
<Icon name="home-outline" size={24} />
<Icon name="heart" color={colors.error} />
```

### LoadingSpinner

```tsx
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
<LoadingSpinner />
<LoadingSpinner overlay size="large" />
```

### KeyboardSafeView (common/)

Uses `react-native-keyboard-controller` — auto-scrolls to focused input with native-like animation + prev/next/done toolbar.

```tsx
import { KeyboardSafeView } from '@/components/common';
<KeyboardSafeView>
  <Input label="Name" />
  <Input label="Email" />
  <Button title="Submit" onPress={submit} />
</KeyboardSafeView>

// Customize offset and hide toolbar:
<KeyboardSafeView bottomOffset={40} showToolbar={false}>
  <Input label="Search" />
</KeyboardSafeView>
```

---

## Common Tasks

### Add a New Screen

Create `app/profile.tsx`:

```tsx
import { Screen, Typography } from '@/components/ui';
import { Spacer } from '@/components/common';
import { useTheme } from '@/hooks';

export default function ProfileScreen() {
  const { colors } = useTheme();
  return (
    <Screen scroll>
      <Spacer size="xl" />
      <Typography variant="h2">Profile</Typography>
    </Screen>
  );
}
```

### Add a New Tab

1. Create `app/(tabs)/explore.tsx`
2. Add to `app/(tabs)/_layout.tsx`:

```tsx
import { Icon } from '@/components/ui/Icon';

<Tabs.Screen
  name="explore"
  options={{
    title: 'Explore',
    tabBarIcon: ({ color }) => <Icon name="search-outline" size={28} color={color} />,
  }}
/>
```

### Add an API Service

```tsx
// services/userService.ts
import { api } from '@/services/api';
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
// store/useAuthStore.ts
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
| `expo-router` | File-based navigation | `app/` | Create files in `app/` — they become routes automatically |
| `zustand` | State management | `store/useAppStore.ts` | `const { colorScheme } = useAppStore()` |
| `@tanstack/react-query` | Data fetching + caching | `services/queryClient.ts` + root layout | `useQuery({ queryKey: ['x'], queryFn })` |
| `axios` | HTTP client + auth | `services/api.ts` | `api.get('/endpoint')` — auto-attaches auth token |
| `expo-secure-store` | Secure key storage | `services/api.ts` | `setAuthToken(token)` / `clearAuthToken()` |
| `expo-font` | Custom font loading | `hooks/useAppFonts.ts` | Loaded automatically in root `_layout.tsx` |
| `expo-splash-screen` | Splash screen | `app/_layout.tsx` | Auto-hides when fonts finish loading |
| `expo-haptics` | Haptic feedback | `components/ui/Button.tsx`, `components/ui/HapticTab.tsx` | `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` |
| `@react-native-async-storage` | Local storage | `utils/storage.ts` | `zustandStorage` adapter for Zustand persist |
| `expo-status-bar` | Status bar control | `components/ui/Screen.tsx`, root layout | Auto light/dark via `<StatusBar style="auto">` |
| `expo-constants` | App constants | Available | `Constants.expoConfig?.extra?.apiUrl` |
| `expo-linking` | Deep linking | Expo Router integration | `Linking.openURL('https://...')` |
| `expo-web-browser` | In-app browser | `components/ui/ExternalLink.tsx` | `openBrowserAsync(url)` |
| `react-native-safe-area-context` | Safe areas | `components/ui/Screen.tsx` | `<Screen edges={['top']}>` |
| `react-native-keyboard-controller` | Keyboard handling | `components/common/KeyboardSafeView.tsx`, root layout | `<KeyboardSafeView>` — auto-scrolls to focused input + prev/next/done toolbar |
| `react-native-screens` | Native screen containers | Expo Router dependency | Automatic — enables native stack performance |

### Available (installed, ready to import)

| Package | Purpose | Usage |
|---------|---------|-------|
| `react-native-reanimated` | Smooth animations | `useSharedValue()`, `useAnimatedStyle()`, `withSpring()` |
| `react-native-gesture-handler` | Touch gestures | `<GestureDetector>`, `Gesture.Pan()`, swipe/pinch/rotate |
| `react-native-svg` | SVG rendering | `<Svg><Circle r={50} fill="red" /></Svg>` |
| `expo-image` | Optimized images | `<Image source={{ uri }} contentFit="cover" />` (replaces RN Image) |
| `expo-linear-gradient` | Gradient backgrounds | `<LinearGradient colors={['#000','#fff']} />` |
| `expo-symbols` | SF Symbols (iOS) | Used by `components/ui/IconSymbol.ios.tsx` |
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
| `pnpm ios` | iOS simulator |
| `pnpm android` | Android emulator |
| `pnpm web` | Web browser |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | Auto-fix lint errors |
| `pnpm format` | Prettier format |
| `pnpm type-check` | TypeScript check |

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| pnpm (not npm) | Faster installs, disk-efficient, strict dependency resolution |
| `node-linker=hoisted` in `.npmrc` | pnpm's default strict symlink mode breaks Metro/Expo — hoisted makes node_modules flat like npm |
| AsyncStorage (not MMKV) | Works in Expo Go without dev client. Swap to MMKV in `utils/storage.ts` when needed |
| Plain StyleSheet | Zero config, no build plugins, universally understood |
| Zustand (not Redux) | Less boilerplate, built-in persist, simpler API |
| Expo Router (not React Navigation) | File-based routing, type-safe, Expo recommended |
| ErrorBoundary at root | Catches any JS crash, shows retry UI instead of white screen |
| Event-based 401 handling | `onAuthExpired()` decouples API layer from navigation |
| `@/*` → `./*` path alias | Maps to project root — all imports use `@/` prefix instead of relative paths |
| Zero relative imports (`../`) | Every file uses `@/` absolute imports — prevents case-sensitivity bugs and makes the codebase unambiguous for LLMs |
