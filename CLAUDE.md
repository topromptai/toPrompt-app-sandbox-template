# CLAUDE.md — Agent Instructions for Expo Boilerplate

Context file for AI agents (Claude Code, Copilot, Cursor) working on projects built from this boilerplate.

## Project Spec

- **Expo SDK 54** / React Native 0.81.5 / React 19.1
- **TypeScript 5.9** strict mode
- **Expo Router 6** file-based navigation with typed routes
- **Zustand 5** state, **TanStack Query 5** data fetching, **Axios** HTTP
- **Styling:** Plain `StyleSheet` — NO NativeWind, NO styled-components
- **New Architecture** + **React Compiler** enabled
- **Path alias:** `@/*` maps to `./src/*`

---

## Mandatory Rules

### DO use the boilerplate components

| Need | Import from | Component |
|------|-------------|-----------|
| Any text | `@/components/common` | `<Text variant="h1">` |
| Any button | `@/components/common` | `<Button variant="primary" onPress={fn}>` |
| Text input | `@/components/common` | `<Input label="Email" error="Required">` |
| Card/container | `@/components/common` | `<Card>` |
| Screen wrapper | `@/components/common` | `<SafeScreen scroll>` |
| Keyboard form | `@/components/common` | `<KeyboardSafeView scroll>` |
| Spacing | `@/components/common` | `<Spacer size="md">` |
| Loading UI | `@/components/common` | `<LoadingSpinner overlay>` |
| Horizontal row | `@/components/layout` | `<Row justify="space-between" gap="sm">` |
| Divider line | `@/components/layout` | `<Divider>` |

### DO NOT

- Import `Text` from `react-native` — use `Text` from `@/components/common`
- Use raw hex colors like `'#0a7ea4'` — use `colors.primary` from `useTheme()`
- Use hardcoded pixel numbers for spacing — use `Spacing.md` or `<Spacer size="md">`
- Use `fontFamily: 'Inter-Regular'` — use `FontFamily.REGULAR` from `@/constants`
- Create `KeyboardAvoidingView` manually — use `<KeyboardSafeView>`
- Wrap screens in `SafeAreaView` manually — use `<SafeScreen>`
- Create a new Axios instance — use `api` from `@/services/api`
- Create a new QueryClient — use `queryClient` from `@/services/queryClient`
- Use relative imports like `../../hooks` — use `@/hooks`

---

## File Reference

### Constants (edit these to customize the app)

| File | Key Exports | Purpose |
|------|-------------|---------|
| `src/constants/colors.ts` | `LightColors`, `DarkColors`, `Colors`, `ThemeColors` | Full light/dark palette |
| `src/constants/fonts.ts` | `FontFamily`, `fontAssets`, `FontWeight` | Font names + require map |
| `src/constants/spacing.ts` | `Spacing`, `BorderRadius`, `SCREEN_PADDING` | Spacing scale + radii |
| `src/constants/typography.ts` | `Typography`, `TypographyVariant` | 13 text style presets |

### Theme

| File | Purpose |
|------|---------|
| `src/theme/ThemeContext.tsx` | Provider wrapping entire app, resolves light/dark/system |
| `src/theme/index.ts` | Re-exports all design tokens |
| `src/hooks/useTheme.ts` | Returns `{ colors, fonts, spacing, typography, isDark, setColorScheme }` |

### State & Data

| File | Purpose |
|------|---------|
| `src/store/useAppStore.ts` | Zustand: `colorScheme` + `isOnboarded`, persisted to AsyncStorage |
| `src/utils/storage.ts` | AsyncStorage wrapper + Zustand `StateStorage` adapter |
| `src/services/api.ts` | Axios: auth interceptors, 401 event emitter, token helpers |
| `src/services/queryClient.ts` | React Query: 5min stale, 2 retries, no window refocus |

### Components

**Common (`@/components/common`):**

| Component | Key Props |
|-----------|-----------|
| `Text` | `variant` (h1-h6, body1-2, caption, etc.), `color`, `align` |
| `Button` | `title`, `variant` (primary/secondary/outline/ghost), `size`, `loading`, `disabled`, `fullWidth` |
| `Input` | `label`, `error`, `hint`, plus all TextInputProps |
| `Card` | `noPadding` |
| `SafeScreen` | `scroll`, `edges`, `noPadding` |
| `KeyboardSafeView` | `scroll`, `keyboardVerticalOffset` |
| `Spacer` | `size` (SpacingKey), `horizontal` |
| `LoadingSpinner` | `overlay`, `size` |
| `ErrorBoundary` | `fallback` |

**Layout (`@/components/layout`):**

| Component | Key Props |
|-----------|-----------|
| `Container` | Padded wrapper |
| `Row` | `justify`, `align`, `gap`, `wrap` |
| `Divider` | `spacing`, `vertical` |

**UI (`@/components/ui/*`):**

| Component | Description |
|-----------|-------------|
| `IconSymbol` | SF Symbols (iOS) / Material Icons (Android/web), 19 pre-mapped icons |
| `HapticTab` | Tab button with haptic feedback |
| `Collapsible` | Expand/collapse section |
| `ExternalLink` | In-app browser link |

### Navigation

```
src/app/
  _layout.tsx           Root Stack (ErrorBoundary -> QueryClient -> Theme)
  +not-found.tsx        404
  modal.tsx             Modal example
  (tabs)/
    _layout.tsx         Bottom tabs
    index.tsx           Home (component showcase)
    settings.tsx        Settings (theme toggle)
```

Add screen: create `src/app/myscreen.tsx`.
Add tab: create `src/app/(tabs)/mytab.tsx` + add `<Tabs.Screen>` in `_layout.tsx`.
Add nested stack: create `src/app/(auth)/` with its own `_layout.tsx`.

---

## Color System (`colors` from `useTheme()`)

```
colors.primary / primaryLight / primaryDark    Brand colors
colors.secondary / accent                      Secondary + accent
colors.background / surface / card             Backgrounds
colors.text / textSecondary / textMuted / textInverse    Text
colors.border / divider / overlay              Borders
colors.success / warning / error / info        Status
colors.link / placeholder                      Interactive
colors.tint / tabIconDefault / tabIconSelected / icon    Navigation
colors.inputBackground / inputBorder           Form inputs
```

## Typography Variants

```
h1(32px Bold) h2(28px Bold) h3(24px SemiBold) h4(20px SemiBold)
h5(18px Medium) h6(16px Medium)
subtitle1(16px Medium) subtitle2(14px Medium)
body1(16px Regular) body2(14px Regular)
caption(12px Regular) overline(10px Medium)
button(14px SemiBold) label(12px Medium)
```

## Spacing Scale

```
xs=4  sm=8  md=12  base=16  lg=20  xl=24  2xl=32  3xl=40  4xl=48  5xl=64
SCREEN_PADDING=16
BorderRadius: sm=4 md=8 lg=12 xl=16 2xl=24 full=9999
```

---

## Patterns

### New Screen

```tsx
import { SafeScreen, Text, Spacer } from '@/components/common';
import { useTheme } from '@/hooks';

export default function MyScreen() {
  const { colors } = useTheme();
  return (
    <SafeScreen scroll>
      <Spacer size="xl" />
      <Text variant="h2">Title</Text>
    </SafeScreen>
  );
}
```

### New API Service

```tsx
import { api } from '@/services/api';
import type { ApiResponse } from '@/types/api';
interface Item { id: string; name: string; }
export const itemService = {
  list: () => api.get<ApiResponse<Item[]>>('/items'),
  create: (data: Omit<Item, 'id'>) => api.post<ApiResponse<Item>>('/items', data),
};
```

### New Zustand Store

```tsx
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@/utils/storage';
interface MyState { value: string; setValue: (v: string) => void; }
export const useMyStore = create<MyState>()(
  persist(
    (set) => ({ value: '', setValue: (value) => set({ value }) }),
    { name: 'my-store', storage: createJSONStorage(() => zustandStorage) },
  ),
);
```

### 401 Handling

```tsx
import { onAuthExpired } from '@/services/api';
useEffect(() => {
  const unsub = onAuthExpired(() => router.replace('/sign-in'));
  return unsub;
}, []);
```

### Adding a Package

```bash
npx expo install expo-camera          # Expo/RN packages
npm install lodash                     # Regular packages
```

If it needs a provider, add to root `_layout.tsx` provider chain.

---

## Build Commands

```bash
npm start          # Dev server
npm run ios        # iOS
npm run android    # Android
npm run web        # Web
npm run lint       # ESLint
npm run type-check # TypeScript
npm run format     # Prettier
```
