import { Stack } from 'expo-router';

const RootLayoutNav: React.FC = () => {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#FFFFFF' } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayoutNav;
