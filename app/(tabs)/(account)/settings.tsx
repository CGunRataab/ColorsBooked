import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const buttons = ['Liked', 'Settings', 'Log Out'];
export default function Settings(): React.ReactNode {
  return (
    <View
      style={{ width: '100%', alignItems: 'center', gap: 25, paddingBottom: 60, marginTop: 50 }}>
      <View style={{ width: '90%' }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ backgroundColor: 'red', width: 50, height: 50, borderRadius: 100 }}>
          <Text>a</Text>
        </TouchableOpacity>
      </View>
      {buttons.map((word, i) => (
        <TouchableOpacity
          key={i}
          style={{
            backgroundColor: '#8000f9',
            borderColor: '#4f31f0',
            borderWidth: 5,
            borderRadius: 10,
            display: 'flex',
            width: '60%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>{word}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
