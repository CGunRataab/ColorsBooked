import { Stack } from 'expo-router';

const TabLayout: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="settings" />
    </Stack>
  );
};

export default TabLayout;
