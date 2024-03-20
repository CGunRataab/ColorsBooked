import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import gql from 'graphql-tag';
import { useContext, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { CreateUserContext } from '@/context/userContext';

const UPLOAD_PIC = gql`
  mutation Mutation($input: PictureCreateInput!) {
    createPicture(input: $input) {
      id
    }
  }
`;

export default function Upload(): React.ReactNode {
  const context = useContext(CreateUserContext);
  const [temp, setTemp] = useState<string>('');
  const [temp2, setTemp2] = useState<{ photo: { uri: string } } | null>();
  const [title, setTitle] = useState('');
  const [color] = useState('rgb(0,0,0)');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [sendImage] = useMutation(UPLOAD_PIC);
  useEffect(() => {
    AsyncStorage.getItem('upload').then((e) => {
      if (e !== null) {
        setTemp(e);
      }
    });
  }, []);
  const Parser = async (): Promise<void> => {
    const tes = await JSON.parse(temp);
    setTemp2(tes);
  };
  useEffect(() => {
    Parser();
  }, [temp]);
  const Upload = async (): Promise<void> => {
    if (!title) {
      setErrorMessage('Needs a title');
      return;
    }
    sendImage({
      variables: {
        input: {
          photo: temp2?.photo.uri,
          title,
          description,
          color,
          userId: context?.user?.id,
          username: context?.user?.name,
        },
      },
    }).catch((err) => console.log(err.message));
    router.push('/(tabs)');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, alignItems: 'center', gap: 10 }}>
        <Image style={{ width: '95%', height: 500 }} source={{ uri: temp2?.photo?.uri }} />
        <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <TextInput
            style={{
              width: '90%',
              height: 40,
              borderColor: 'black',
              borderRadius: 10,
              borderWidth: 1,
              fontSize: 20,
              paddingLeft: 15,
            }}
            placeholderTextColor="grey"
            onChangeText={(e) => setTitle(e)}
            placeholder="Title"
          />
          {errorMessage !== null ? (
            <Text style={{ color: 'red', fontWeight: '500', fontSize: 15 }}>{errorMessage}</Text>
          ) : (
            <></>
          )}
        </View>
        <TextInput
          style={{
            width: '90%',
            height: 70,
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 1,
            fontSize: 20,
            paddingLeft: 15,
          }}
          placeholderTextColor="grey"
          onChangeText={(e) => setDescription(e)}
          placeholder="Description"
        />
        <Text>{color}</Text>
        <TouchableOpacity
          onPress={() => {
            Upload();
          }}
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            width: 100,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0d5',
          }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Upload</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
