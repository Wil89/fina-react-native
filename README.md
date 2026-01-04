# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

# Theme & Design System Setup Guide

## 🎨 Apple-Inspired Design System

This project uses a custom theme system inspired by Apple's iOS Human Interface Guidelines, featuring:
- **Inter font family** for clean, modern typography
- **Glassmorphism effects** for that signature Apple blur/glass look
- **Complete design tokens** (colors, typography, spacing, shadows)
- **Dark mode support** built-in
- **Reusable UI components**

---

## 📦 Required Packages

Install these packages to get the full theme system working:

```bash
npx expo install expo-blur @expo-google-fonts/inter expo-font
```

### Package Details:
- `expo-blur` - For glass/blur effects (iOS glass tabs, cards, etc.)
- `@expo-google-fonts/inter` - Inter font family (400, 500, 600, 700 weights)
- `expo-font` - Font loading utility (already installed)

---

## 🚀 Quick Start

### 1. Load Fonts in Your Root Layout

Update `app/_layout.tsx`:

```typescript
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // ... your navigation
  );
}
```

### 2. Use the Theme Hook

```typescript
import { useTheme } from '@/hooks/use-theme';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello!</Text>
    </View>
  );
}
```

### 3. Use Pre-built UI Components

```typescript
import { Button, Card, Input, Text, GlassView } from '@/components/ui';

function MyScreen() {
  return (
    <View>
      <Text variant="largeTitle" color="primary">Welcome</Text>
      
      <Card shadow="lg" padding={20}>
        <Text variant="body">This is a card</Text>
      </Card>
      
      <Input 
        label="Email"
        placeholder="Enter your email"
        error="Invalid email"
      />
      
      <Button variant="primary" size="lg" fullWidth>
        Sign In
      </Button>
      
      <GlassView intensity={20}>
        <Text>Glass effect content</Text>
      </GlassView>
    </View>
  );
}
```

---

## 🎨 Design Tokens

### Colors
```typescript
theme.colors.background        // Main background
theme.colors.text             // Primary text
theme.colors.tint             // iOS blue accent
theme.colors.glassBackground  // Translucent glass
```

### Typography Variants
- `largeTitle`, `title1`, `title2`, `title3`
- `headline`, `body`, `bodyEmphasized`
- `callout`, `subheadline`
- `footnote`, `caption1`, `caption2`

### Spacing (8pt grid)
```typescript
theme.spacing.xs   // 4
theme.spacing.sm   // 8
theme.spacing.md   // 16
theme.spacing.lg   // 24
theme.spacing.xl   // 32
```

### Border Radius
```typescript
theme.radius.sm    // 8
theme.radius.md    // 12
theme.radius.lg    // 16
theme.radius.full  // 9999
```

### Shadows
```typescript
theme.shadows.sm
theme.shadows.md
theme.shadows.lg
theme.shadows.xl
```

---

## 🪟 Glass/Blur Effects

The `GlassView` component creates Apple-style glassmorphism:

```typescript
<GlassView 
  intensity={20}          // Blur intensity 0-100
  tint="light"           // 'light' | 'dark' | 'default'
  borderRadius={16}
>
  <Text>Glass content</Text>
</GlassView>
```

**Note:** After installing `expo-blur`, uncomment the real implementation in `components/ui/glass-view.tsx`

---

## 📱 UI Components

### Button
```typescript
<Button 
  variant="primary"      // 'primary' | 'secondary' | 'ghost' | 'destructive'
  size="lg"             // 'sm' | 'md' | 'lg'
  loading={isLoading}
  fullWidth
>
  Sign In
</Button>
```

### Input
```typescript
<Input
  label="Password"
  placeholder="Enter password"
  error={errorMessage}
  leftIcon={<Icon name="lock" />}
  rightIcon={<Icon name="eye" />}
  onRightIconPress={toggleShowPassword}
/>
```

### Card
```typescript
<Card 
  glass={true}          // Enable glass effect
  shadow="lg"           // Shadow size
  padding={20}
>
  <Text>Card content</Text>
</Card>
```

### Text
```typescript
<Text 
  variant="headline"    // Typography variant
  color="secondary"     // Color variant
  align="center"
>
  Hello World
</Text>
```

---

## 🌓 Dark Mode

Dark mode is automatically handled based on system preferences. The theme system switches between light and dark palettes automatically.

To manually check the color scheme:
```typescript
import { useColorSchemeValue } from '@/hooks/use-theme';

const colorScheme = useColorSchemeValue(); // 'light' | 'dark'
```

---

## 🎯 Migration Guide

To migrate existing screens to use the new theme:

### Before:
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
```

### After:
```typescript
function MyScreen() {
  const theme = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    },
    title: {
      ...theme.typography.title2,
      color: theme.colors.text,
    },
  });
}
```

Or better yet, use the UI components:
```typescript
<View style={{ padding: theme.spacing.md }}>
  <Text variant="title2">My Title</Text>
</View>
```

---

## 📚 Examples

See `app/(auth)/login-example.tsx` for a full example of the login page refactored with the new theme system.

---

## 🔧 Customization

### Extending Colors
Edit `theme/colors.ts` to add your brand colors:

```typescript
export const Colors = {
  primary: {
    // Your brand color scale
    500: '#YOUR_BRAND_COLOR',
  },
  // ...
};
```

### Adding Typography Variants
Edit `theme/typography.ts`:

```typescript
export const Typography = {
  // ...
  custom: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  },
};
```

---

## 🎨 Apple Glass Tab Bar Example

Coming soon! Check the components directory for a `GlassTabBar` component that creates the signature iOS glass bottom tab navigation.