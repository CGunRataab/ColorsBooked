import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Stack } from 'expo-router';
import { useState } from 'react';

import { CreateUserContext } from '@/context/userContext';

type userInfo = {
  id: string;
  name: string;
  email: string;
};

const RootLayoutNav: React.FC = () => {
  const client = new ApolloClient({
    uri: 'https://color-backend.vercel.app/api/graphql',
    cache: new InMemoryCache(),
  });
  const [user, setUser] = useState<userInfo | null>(null);
  return (
    <ApolloProvider client={client}>
      <CreateUserContext.Provider value={{ user, setUser }}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: '#FFFFFF' } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="upload" />
        </Stack>
      </CreateUserContext.Provider>
    </ApolloProvider>
  );
};

export default RootLayoutNav;
