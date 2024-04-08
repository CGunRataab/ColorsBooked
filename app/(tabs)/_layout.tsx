import { gql, useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Tabs, router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Dimensions, Text, TouchableOpacity, View } from 'react-native';

import { AccountIcon } from '@/assets/images/Group';
import { HomeIcon } from '@/assets/images/Vector';
import { CreateUserContext } from '@/context/userContext';

const GET_USER_ID = gql`
  query ExampleQuery($token: String!) {
    getUser(token: $token) {
      email
      id
      name
    }
  }
`;

interface ForCamera {
  status: ImagePicker.PermissionResponse | null;
  requestPermission: () => Promise<ImagePicker.PermissionResponse>;
  setPhoto: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | null>>;
}

const Capturer = async ({
  status,
  requestPermission,
  setPhoto,
}: ForCamera): Promise<React.ReactNode | void> => {
  if (!status || !status.granted) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Give Camera Permission</Text>
        <Button
          title="Allow"
          onPress={() => {
            (() => {
              requestPermission();
            })();
          }}
        />
      </View>
    );
  }

  const result = await ImagePicker.launchCameraAsync({
    quality: 1,
    allowsEditing: true,
    aspect: [9, 16],
  });
  if (!result.canceled) {
    if (result.assets[0].uri) setPhoto(result.assets[0]);
  }
};
const Picker = async ({
  status,
  requestPermission,
  setPhoto,
}: ForCamera): Promise<React.ReactNode | void> => {
  router.push('/login');
  if (!status || !status.granted) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Give Gallery Permission</Text>
        <Button
          title="Allow"
          onPress={() => {
            (() => {
              requestPermission();
            })();
          }}
        />
      </View>
    );
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [9, 16],
    quality: 1,
  });
  if (!result.canceled) {
    if (result.assets[0].uri) setPhoto(result.assets[0]);
  }
};

const TabLayout: React.FC = () => {
  const context = useContext(CreateUserContext);
  const [getUser] = useLazyQuery(GET_USER_ID);
  const [popUp, setPopUp] = useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const Parser = async (): Promise<string | null> => {
    const temp = await AsyncStorage.getItem('userId');
    getUser({ variables: { token: temp } })
      .then((res) => {
        context?.setUser(res.data.getUser);
        if (res.data === undefined || res.data.getUser === null) {
          console.log(res.data);
          router.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
        router.push('/login');
      });
    return temp;
  };
  useEffect(() => {
    Parser();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem('upload', JSON.stringify({ photo }));
    if (photo) router.push({ pathname: `/upload` });
  }, [photo]);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00EEEE',
        headerShown: false,
        tabBarStyle: {
          borderWidth: 1,
          borderTopWidth: 2,
          borderTopColor: '#00EEEE',
          backgroundColor: '#0077EE',
          height: 80,
          paddingTop: 20,
        },
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View
              style={{ paddingLeft: 25, paddingTop: 10, display: 'flex', alignItems: 'center' }}>
              <HomeIcon width="35" height="35" color={color} />
              <Text style={{ color, fontSize: 13, fontWeight: '500' }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(camera)"
        options={{
          tabBarButton(props): React.ReactNode {
            return (
              <View
                style={{
                  width: '25%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: -1,
                }}>
                {popUp && (
                  <View
                    style={{
                      zIndex: -1,
                      position: 'absolute',
                      height: 550,
                      width: Dimensions.get('screen').width,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderTopWidth: 1,
                      borderTopColor: '#00EEEE',
                      backgroundColor: '#0077EE',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        marginTop: 30,
                        width: '80%',
                        borderColor: '#00EEEE',
                        borderWidth: 2,
                        height: 70,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        Picker({ status, requestPermission, setPhoto });
                      }}>
                      <Text style={{ fontSize: 20, color: '#00EEEE' }}>Upload Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginTop: 30,
                        width: '80%',
                        borderColor: '#00EEEE',
                        borderWidth: 2,
                        height: 70,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        Capturer({ status, requestPermission, setPhoto });
                      }}>
                      <Text style={{ fontSize: 20, color: '#00EEEE' }}>Take Picture</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 2,
                    borderColor: '#00EEEE',
                    borderRadius: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setPopUp(!popUp);
                  }}>
                  <Text style={{ fontSize: 50, marginTop: -10, color: '#00EEEE' }}>+</Text>
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View
              style={{ paddingRight: 25, paddingTop: 10, display: 'flex', alignItems: 'center' }}>
              <AccountIcon width="35" height="35" color={color} />
              <Text style={{ color, fontSize: 13, fontWeight: '500' }}>Account</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
