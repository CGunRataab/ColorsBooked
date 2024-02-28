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
    </Stack>
  );
};

export default TabLayout;
