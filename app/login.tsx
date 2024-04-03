import { gql, useLazyQuery } from '@apollo/client';
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
  query LoginUser($input: UserLogin!) {
    loginUser(input: $input) {
      token
    }
  }
`;

export default function Login(): React.ReactNode {
  const context = useContext(CreateUserContext);
  const [userLogin] = useLazyQuery(LOGIN_USER);
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
          const temp = res.data.loginUser.token;
          AsyncStorage.setItem('userId', temp);
          router.replace('/(tabs)/(home)');
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
          gap: 50,
          paddingBottom: 50,
        }}>
        <Text style={{ fontSize: 80, color: '#0be' }}>Login</Text>
        <View
          style={{
            width: '90%',
            height: '35%',
            display: 'flex',
            alignItems: 'center',
            gap: 25,
          }}>
          <TextInput
            textContentType="emailAddress"
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
            secureTextEntry
            textContentType="password"
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
                backgroundColor: '#1af',
                height: 55,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderBlockColor: 'black',
                borderWidth: 2,
              }}>
              <Text style={{ fontSize: 25 }}>Enter</Text>
            </TouchableOpacity>
            <Link
              href="/register"
              style={{
                width: '75%',
                fontSize: 15,
                textAlign: 'right',
                fontWeight: '600',
                color: '#0ad',
              }}>
              Register
            </Link>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
