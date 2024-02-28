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
  const [, setSearch] = useState<string>('');
  const [extended, setExtended] = useState(false);
  return (
    <View
      style={
        !extended
          ? {
              display: 'flex',
              paddingTop: 10,
              width: '100%',
              borderWidth: 1,
              borderRadius: 10,
              height: 100,
              borderColor: 'black',
              flexDirection: 'column',
            }
          : {
              display: 'flex',
              paddingTop: 10,
              width: '100%',
              borderWidth: 1,
              borderRadius: 10,
              height: 290,
              borderColor: 'black',
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
            borderColor: 'black',
            borderWidth: 2,
          }}
          onPress={() => setExtended(!extended)}>
          <Text style={{ fontSize: 20 }}>C</Text>
        </TouchableOpacity>
        <TextInput
          style={{
            width: '60%',
            borderWidth: 1,
            borderRadius: 20,
            height: 40,
            fontSize: 20,
          }}
          textAlign="center"
          placeholder="Search"
          onChangeText={(e) => setSearch(e)}
          placeholderTextColor="grey"
        />
        <TouchableOpacity
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 100,
          }}>
          <EnterArrow width="40px" height="40px" />
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
