import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { SettingsIcon } from '@/assets/images/SettingIcon';
import { CreateUserContext } from '@/context/userContext';

export default function Page(): React.ReactNode {
  const userContext = useContext(CreateUserContext);
  const [myPics] = useState([
    {
      img: require('@/assets/images/favicon.png'),
      title: 'My Pic',
      description: 'This def my pic',
    },
    {
      img: require('@/assets/images/favicon.png'),
      title: 'My Pic',
      description: 'This def my pic',
    },
  ]);
  if (!userContext) return;
  const { user } = userContext;
  return (
    <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
      <FlatList
        contentContainerStyle={{ display: 'flex', alignItems: 'center', width: '100%', gap: 35 }}
        ListHeaderComponent={() => (
          <View style={{ width: Dimensions.get('screen').width, backgroundColor: '#0077EE' }}>
            <View
              style={{
                height: 300,
                paddingBottom: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderBottomColor: '#00EEEE',
                borderBottomWidth: 3,
                width: '100%',
                gap: 20,
              }}>
              <View
                style={{
                  backgroundColor: '#1af',
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: 'black',
                }}
              />
              <Text style={{ fontSize: 40, color: '#00EEEE' }}>{user?.name}</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                width: '95%',
                flexDirection: 'row-reverse',
              }}>
              <TouchableOpacity
                style={{
                  marginTop: 50,
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                }}
                onPress={() => {
                  router.navigate('/settings');
                }}>
                <SettingsIcon width="35" height="35" color="#00EE77" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        data={myPics}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              width: '90%',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Image style={{ width: 300, height: 300 }} source={item.img} />
            <Text style={{ fontSize: 35 }}>{item.title}</Text>
            <Text style={{ fontSize: 25, color: 'grey' }}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
