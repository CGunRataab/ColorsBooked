import { Tabs } from 'expo-router';

const TabLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderRadius: 10,
          borderWidth: 1,
          borderTopWidth: 1,
          borderTopColor: 'black',
          backgroundColor: '#F5F5F5',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
        }}
      />
      <Tabs.Screen name="(account)" />
    </Tabs>
  );
};

export default TabLayout;
