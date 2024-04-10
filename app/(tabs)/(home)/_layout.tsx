import { Stack } from 'expo-router';

const TabLayout: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Tab One',
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: 'Tab One',
        }}
      />
      <Stack.Screen name="insidePic" />
    </Stack>
  );
};

export default TabLayout;
