// In: app/_layout.tsx
import React from 'react';
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';

// Replace this with your actual authentication logic
// For now, we'll simulate it.
const useAuth = () => {
  // In a real app, you'd check for a token in AsyncStorage
  return {
    isAuthenticated: false, // <--- CHANGE to `true` to simulate being logged in
  };
};

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = String(segments[0]) === '(auth)';

    if (isAuthenticated && inAuthGroup) {
      // User is authenticated but is in the auth flow, redirect to the main app
      router.replace('/(tabs)');
    } else if (!isAuthenticated && !inAuthGroup) {
      // User is not authenticated and not in the auth flow, redirect to login
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  // You can wrap this with context providers for auth, etc.
  return <RootLayoutNav />;
}
