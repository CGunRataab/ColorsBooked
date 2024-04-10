import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import { EnterArrow } from '@/assets/images/enterArrow';

interface header {
  setColorWheel: React.Dispatch<React.SetStateAction<boolean>>;
  colorWheel: boolean;
  Colors: string[];
  chosenColor: string;
  setChosenColor: React.Dispatch<React.SetStateAction<string>>;
}

export const Header = ({
  setColorWheel,
  colorWheel,
  Colors,
  chosenColor,
  setChosenColor,
}: header): React.ReactNode => {
  const [search, setSearch] = useState<string>('');
  const [extended, setExtended] = useState(false);
  const Search = (): void => {
    router.push({ pathname: '/(tabs)/(home)/search', params: { search, chosenColor } });
  };
  return (
    <View
      style={
        !extended
          ? {
              display: 'flex',
              paddingTop: 10,
              width: '100%',
              borderWidth: 2,
              borderRadius: 10,
              height: 100,
              borderTopColor: 'transparent',
              backgroundColor: '#0077EE',
              borderColor: '#00EEEE',
              flexDirection: 'column',
            }
          : {
              display: 'flex',
              paddingTop: 10,
              width: '100%',
              borderWidth: 2,
              borderRadius: 10,
              height: 290,
              backgroundColor: '#0077EE',
              borderColor: '#00EEEE',
              borderTopColor: 'transparent',
              flexDirection: 'column',
            }
      }>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          height: 110,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            backgroundColor: chosenColor,
            borderColor: '#00EEEE',
            borderWidth: 2,
          }}
          onPress={() => setExtended(!extended)}>
          <Text style={{ fontSize: 20 }}>C</Text>
        </TouchableOpacity>
        <TextInput
          style={{
            width: '60%',
            borderWidth: 2,
            borderRadius: 15,
            borderColor: '#00EEEE',
            height: 40,
            fontSize: 20,
            color: '#00EEEE',
          }}
          textAlign="center"
          placeholder="Search"
          onChangeText={(e) => setSearch(e)}
          placeholderTextColor="#00EEEE"
        />
        <TouchableOpacity
          style={{
            borderColor: '#00EEEE',
            borderWidth: 2,
            borderRadius: 100,
          }}
          onPress={() => {
            Search();
          }}>
          <EnterArrow width="40px" height="40px" color="#00EEEE" />
        </TouchableOpacity>
      </View>
      {extended ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: 20,
            paddingLeft: 25,
            flexWrap: 'wrap',
          }}>
          {Colors.map((color, i) =>
            color !== 'last' ? (
              <TouchableOpacity
                onPress={() => setChosenColor(color)}
                key={i}
                style={{
                  backgroundColor: color,
                  width: 35,
                  height: 35,
                  borderRadius: 100,
                  borderColor: 'black',
                  borderWidth: 2,
                }}
              />
            ) : (
              <TouchableOpacity
                style={{
                  width: '60%',
                  marginLeft: '17%',
                  height: 40,
                  borderColor: 'black',
                  borderWidth: 2,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setColorWheel(!colorWheel)}
                key={i}>
                <Text style={{ fontSize: 15 }}>Custom</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
