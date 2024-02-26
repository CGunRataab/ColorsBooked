import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Page(): React.ReactNode {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          flexDirection: 'row-reverse',
          paddingLeft: 20,
        }}>
        <TouchableOpacity
          style={{
            marginTop: 50,
            height: 40,
            width: 40,
            backgroundColor: 'black',
            borderRadius: 100,
          }}>
          <Text>a</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 300,
          paddingBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          width: '100%',
          gap: 20,
        }}>
        <View style={{ backgroundColor: 'black', width: 150, height: 150, borderRadius: 100 }} />
        <Text style={{ fontSize: 40 }}>User</Text>
      </View>
    </View>
  );
}
