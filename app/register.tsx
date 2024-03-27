import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { CreateUserContext } from '@/context/userContext';

const CREATE_USER = gql`
  mutation CreateUser($input: UserCreateInput!) {
    createUser(input: $input) {
      id
      email
      password
      name
    }
  }
`;

export default function Register(): React.ReactNode {
  const [userCreate] = useMutation(CREATE_USER);
  const context = useContext(CreateUserContext);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const Register = (): void => {
    if (password !== password2) {
      setErrorMessage('password doesnt match');
      return;
    }
    //eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setErrorMessage('please use a real email');
      return;
    }
    userCreate({
      variables: {
        input: {
          email,
          name,
          password,
        },
      },
    })
      .then((res) => {
        if (context !== null) {
          context.setUser(res.data.createUser);
          const temp = res.data.createUser.id;
          AsyncStorage.setItem('userId', temp);
          router.replace('/(tabs)/(home)');
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          paddingBottom: 50,
        }}>
        <Text style={{ fontSize: 80, color: '#0be' }}>Register</Text>
        <View
          style={{
            width: '90%',
            height: '50%',
            display: 'flex',
            alignItems: 'center',
            gap: 25,
          }}>
          <TextInput
            style={{
              borderColor: 'black',
              borderWidth: 2,
              width: '80%',
              height: 60,
              borderRadius: 10,
              paddingLeft: 15,
              fontSize: 20,
            }}
            value={name}
            onChangeText={(e) => setName(e)}
            placeholder="Enter Name"
            placeholderTextColor="black"
          />
          <TextInput
            style={{
              borderColor: 'black',
              borderWidth: 2,
              width: '80%',
              height: 60,
              borderRadius: 10,
              paddingLeft: 15,
              fontSize: 20,
            }}
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder="Enter Email"
            placeholderTextColor="black"
          />
          <TextInput
            style={{
              borderColor: 'black',
              borderWidth: 2,
              width: '80%',
              height: 60,
              borderRadius: 10,
              paddingLeft: 15,
              fontSize: 20,
            }}
            value={password}
            onChangeText={(e) => setPassword(e)}
            placeholder="Enter Password"
            placeholderTextColor="black"
          />
          <TextInput
            style={{
              borderColor: 'black',
              borderWidth: 2,
              width: '80%',
              height: 60,
              borderRadius: 10,
              paddingLeft: 15,
              fontSize: 20,
            }}
            value={password2}
            onChangeText={(e) => setPassword2(e)}
            placeholder="Repeat Password"
            placeholderTextColor="black"
          />
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}>
            {errorMessage && (
              <Text style={{ color: 'red', fontWeight: '500', fontSize: 15 }}>{errorMessage}</Text>
            )}
            <TouchableOpacity
              onPress={Register}
              style={{
                width: '50%',
                backgroundColor: '#1af',
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderBlockColor: 'black',
                borderWidth: 2,
              }}>
              <Text style={{ fontSize: 25 }}>Register</Text>
            </TouchableOpacity>
            <Link
              href="../"
              style={{
                width: '75%',
                fontSize: 15,
                fontWeight: '600',
                textAlign: 'right',
                color: '#0ad',
              }}>
              Login
            </Link>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
