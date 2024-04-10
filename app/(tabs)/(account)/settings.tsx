import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { EnterArrow } from '@/assets/images/enterArrow';

// const buttons = ['Liked', 'Settings', 'Log Out'];
export default function Settings(): React.ReactNode {
  const Logout = (): void => {
    AsyncStorage.clear();
    router.replace('/login');
  };
  return (
    <View
      style={{ width: '100%', alignItems: 'center', gap: 25, paddingBottom: 60, marginTop: 50 }}>
      <View style={{ width: '90%' }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            borderColor: '#00EEEE',
            borderWidth: 2,
            width: 50,
            height: 50,
            borderRadius: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ rotate: '180deg' }],
          }}>
          <EnterArrow width="40px" height="40px" color="#00EEEE" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#0077EE',
          borderColor: '#00EEEE',
          borderWidth: 2,
          borderRadius: 10,
          display: 'flex',
          width: '60%',
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          router.push('/insettings');
        }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#0077EE',
          borderColor: '#00EEEE',
          borderWidth: 2,
          borderRadius: 10,
          display: 'flex',
          width: '60%',
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={Logout}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
