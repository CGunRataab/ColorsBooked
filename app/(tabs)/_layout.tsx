import { gql, useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Tabs, router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Dimensions, Text, TouchableOpacity, View } from 'react-native';

import { CreateUserContext } from '@/context/userContext';
const GET_USER_ID = gql`
  query ExampleQuery($id: ID) {
    getUser(id: $id) {
      email
      id
      name
    }
  }
`;

interface ForCamera {
  status: ImagePicker.PermissionResponse | null;
  requestPermission: () => Promise<ImagePicker.PermissionResponse>;
  photo: ImagePicker.ImagePickerAsset | null;
  setPhoto: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | null>>;
}

const Capturer = async ({
  status,
  requestPermission,
  photo,
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

  const result = await ImagePicker.launchCameraAsync({ quality: 1 });
  if (!result.canceled) {
    if (result.assets[0].uri) setPhoto(result.assets[0]);
  }
};
const Picker = async ({
  status,
  requestPermission,
  photo,
  setPhoto,
}: ForCamera): Promise<React.ReactNode | void> => {
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
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
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
    getUser({ variables: { id: temp } }).then((res) => {
      context?.setUser(res.data.getUser);
      if (res.data === undefined || res.data.getUser === null) {
        router.push('/login');
      }
    });
    return temp;
  };
  useEffect(() => {
    Parser();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem('upload', JSON.stringify({ photo }));
    if (photo) router.push({ pathname: `../upload` });
  }, [photo]);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderWidth: 1,
          borderTopWidth: 1,
          borderTopColor: 'grey',
          backgroundColor: '#F5F5F5',
          height: 90,
          paddingTop: 20,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
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
                      borderTopColor: 'black',
                      backgroundColor: '#F5F5F5',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        marginTop: 30,
                        width: '80%',
                        borderColor: 'black',
                        borderWidth: 2,
                        height: 70,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        Picker({ status, requestPermission, photo, setPhoto });
                      }}>
                      <Text style={{ fontSize: 20 }}>Upload Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginTop: 30,
                        width: '80%',
                        borderColor: 'black',
                        borderWidth: 2,
                        height: 70,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        Capturer({ status, requestPermission, photo, setPhoto });
                      }}>
                      <Text style={{ fontSize: 20 }}>Take Picture</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    width: 60,
                    height: 60,
                    borderWidth: 3,
                    borderColor: 'black',
                    borderRadius: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setPopUp(!popUp);
                  }}>
                  <Text style={{ fontSize: 50, marginTop: -7 }}>+</Text>
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen name="(account)" />
    </Tabs>
  );
};

export default TabLayout;
