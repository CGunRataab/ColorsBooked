import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

const TabLayout: React.FC = () => {
  const [popUp, setPopUp] = useState(false);
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
