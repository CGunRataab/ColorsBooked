import { gql, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
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

const LOGIN_USER = gql`
  mutation LoginUser($input: UserLogin!) {
    loginUser(input: $input) {
      id
      email
      password
    }
  }
`;

export default function Login(): React.ReactNode {
  const context = useContext(CreateUserContext);
  const [userLogin] = useMutation(LOGIN_USER);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Login = async (): Promise<void> => {
    userLogin({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
      .then((res) => {
        if (context !== null) {
          context.setUser(res.data.loginUser);
          const temp = res.data.loginUser.id;
          AsyncStorage.setItem('userId', temp);
          router.replace('/(tabs)');
        }
      })
      .catch((error) => setErrorMessage(error.message));
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
        <Text style={{ fontSize: 80 }}>Login</Text>
        <View
          style={{
            borderBlockColor: 'black',
            borderWidth: 3,
            width: '90%',
            height: '50%',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TextInput
            textContentType="emailAddress"
            style={{
              borderColor: 'black',
              borderWidth: 2,
              width: '80%',
              height: 80,
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
            textContentType="password"
            style={{
              borderColor: 'black',
              borderWidth: 2,
              width: '80%',
              height: 80,
              borderRadius: 10,
              paddingLeft: 15,
              fontSize: 20,
            }}
            value={password}
            onChangeText={(e) => setPassword(e)}
            placeholder="Enter Password"
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
              onPress={() => {
                Login();
              }}
              style={{
                width: '50%',
                backgroundColor: 'lime',
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderBlockColor: 'black',
                borderWidth: 2,
              }}>
              <Text style={{ fontSize: 25 }}>Login</Text>
            </TouchableOpacity>
            <Link
              href="/register"
              style={{ width: '75%', fontSize: 15, textAlign: 'right', color: '#0000EE' }}>
              Register
            </Link>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
