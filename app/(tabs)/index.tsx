import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

import { Header } from '@/components/header';
import { Pictures } from '@/components/pictures';

const Colors = [
  '#000',
  '#555',
  '#f00',
  '#f09',
  '#508',
  '#00c',
  '#07f',
  '#0ff',
  '#091',
  '#0f0',
  '#ff0',
  '#fa0',
  '#f50',
  '#fff',
  'last',
];

const GET_PICTURE_LIST = gql`
  query GetPictureList {
    getPictureList {
      description
      photo
      title
      username
      color {
        b
        g
        hex
        r
      }
    }
  }
`;

export default function TabOneScreen(): React.ReactNode {
  const [colorWheel, setColorWheel] = useState(false);
  const { data, loading, error } = useQuery(GET_PICTURE_LIST);
  const [chosenColor, setChosenColor] = useState('cyan');
  const [state, setState] = useState({
    currentColor: '#00FF00',
    swatchesOnly: false,
    swatchesLast: false,
    swatchesEnabled: false,
    disc: false,
    sliderHidden: true,
  });
  const [barColor, setBarColor] = useState('');
  if (error)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{error.message}</Text>
      </View>
    );
  if (loading) return <Text>Loading</Text>;
  const { getPictureList } = data;
  const onColorChange = (color: string): void => {
    setState({ ...state, currentColor: color });
  };
  const onColorChangeComplete = (color: string): void => {
    setBarColor(color);
  };
  return (
    <View style={{ backgroundColor: '#f8f8f8' }}>
      {colorWheel && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: 2,
            width: '100%',
            height: Dimensions.get('screen').height,
          }}>
          <View
            style={{
              backgroundColor: 'black',
              opacity: 0.5,
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          />
          {/* <View
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}> */}
          <ColorPicker
            color={state.currentColor}
            swatchesOnly={state.swatchesOnly}
            onColorChange={onColorChange}
            onColorChangeComplete={onColorChangeComplete}
            sliderHidden={state.sliderHidden}
            thumbSize={40}
            row={false}
            swatchesLast={state.swatchesLast}
            swatches={state.swatchesEnabled}
            discrete={state.disc}
          />
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: barColor,
                width: 300,
                borderRadius: 5,
                height: 60,
                position: 'absolute',
                marginTop: -100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 25 }}>{state.currentColor}</Text>
            </View>
            <View style={{ marginBottom: 150, display: 'flex', flexDirection: 'row', gap: 40 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  width: 100,
                  height: 50,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setColorWheel(false)}>
                <Text style={{ fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0c0',
                  width: 100,
                  height: 50,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setColorWheel(false);
                  setChosenColor(state.currentColor);
                }}>
                <Text style={{ fontSize: 20, color: 'white' }}>Choose</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={{ gap: 30 }}
              ListHeaderComponent={() => (
                <Header
                  chosenColor={chosenColor}
                  setChosenColor={setChosenColor}
                  Colors={Colors}
                  colorWheel={colorWheel}
                  setColorWheel={setColorWheel}
                />
              )}
              style={{ width: '100%' }}
              data={getPictureList}
              renderItem={({ item }) => (
                <Pictures
                  title={item.title}
                  description={item.description}
                  color={item.color}
                  photo={item.photo}
                  username={item.username}
                />
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}
