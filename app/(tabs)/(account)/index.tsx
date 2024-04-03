import { useLazyQuery } from '@apollo/client';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import gql from 'graphql-tag';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';

import { SettingsIcon } from '@/assets/images/SettingIcon';
import { CreateUserContext } from '@/context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GET_MY_PICTURES = gql`
  query GetUsersPictureList($token: String!) {
    getUsersPictureList(token: $token) {
      photo
      title
      description
      color {
        hex
      }
    }
  }
`;

export default function Page(): React.ReactNode {
  const userContext = useContext(CreateUserContext);
  const [getUserPicture, { loading }] = useLazyQuery(GET_MY_PICTURES);
  const [myPics, setMyPics] = useState();
  const Parser = async (): Promise<void> => {
    const token = await AsyncStorage.getItem('userId');
    getUserPicture({ variables: { token } }).then((res) => setMyPics(res.data.getUsersPictureList));
  };
  useEffect(() => {
    Parser();
  }, []);
  if (!userContext) return;
  if (loading) return;
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
              alignItems: 'flex-start',
              borderColor: 'black',
              gap: 15,
              borderWidth: 1,
            }}>
            <Image
              style={{ width: 400, height: 400, borderWidth: 1, borderColor: 'black' }}
              source={item.photo}
            />
            <View style={{ width: '80%', display: 'flex', marginLeft: 30 }}>
              <Text style={{ fontSize: 35 }}>{item.title}</Text>
              <Text style={{ fontSize: 25, color: 'grey' }}>
                {item.description}/{item.color.hex}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
