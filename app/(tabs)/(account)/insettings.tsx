import { gql, useLazyQuery, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { EnterArrow } from '@/assets/images/enterArrow';
import { CreateUserContext } from '@/context/userContext';

const LOGIN_USER = gql`
  query LoginUser($input: ChangePassword!) {
    changePassword(input: $input)
  }
`;
const UPDATE_USER = gql`
  mutation Mutation($input: UserUpdate!) {
    updateUser(input: $input) {
      password
      name
      email
    }
  }
`;

// const buttons = ['Liked', 'Settings', 'Log Out'];
export default function Settings(): React.ReactNode {
  const [changeName, setChangeName] = useState('');
  const [changeEmail, setChangeEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [proven, setProven] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [checkProven] = useLazyQuery(LOGIN_USER);
  const [changeInformarion] = useMutation(UPDATE_USER);
  const userContext = useContext(CreateUserContext);
  const Login = async (): Promise<void> => {
    checkProven({
      variables: { input: { email: userContext?.user?.email, password: oldPassword } },
    })
      .then((res) => {
        setProven(res.data.changePassword);
        setPopUp(false);
      })
      .catch((err) => setErrorMessage(err.message));
  };
  const Change = (): void => {
    //eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(changeEmail) === false && changeEmail !== '') {
      setErrorMessage('please use a real email');
      return;
    }
    Alert.alert(
      'Change Information',
      'Are you sure you want to change your information? If you accept you will go back to the login screen',
      [
        {
          text: 'Accept',
          onPress: () => {
            changeInformarion({
              variables: {
                input: {
                  id: userContext?.user?.id,
                  email: changeEmail,
                  password: newPassword,
                  name: changeName,
                },
              },
            });
            AsyncStorage.clear();
            router.replace('/login');
          },
        },
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert('This alert was dismissed by tapping outside of the alert dialog.'),
      },
    );
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{ width: '100%', alignItems: 'center', gap: 25, paddingBottom: 60, marginTop: 50 }}>
        <Modal visible={popup} transparent>
          <View style={{ height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.2 }} />
          <View
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderColor: '#00EEEE',
                width: '70%',
                paddingLeft: 25,
                height: 200,
                borderRadius: 10,
                borderWidth: 2,
                display: 'flex',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={{
                  borderColor: '#f0203E',
                  borderWidth: 1,
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setPopUp(false)}>
                <Text style={{ color: '#f0203E' }}>X</Text>
              </TouchableOpacity>
              <TextInput
                secureTextEntry
                textContentType="password"
                placeholderTextColor="#00b0eE"
                placeholder="old password"
                style={{
                  borderColor: '#00EEEE',
                  width: '90%',
                  paddingLeft: 10,
                  height: 50,
                  borderRadius: 10,
                  borderWidth: 2,
                  fontSize: 17,
                }}
                onChangeText={(e) => setOldPassword(e)}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#0077EE',
                  borderColor: '#00EEEE',
                  borderWidth: 2,
                  borderRadius: 10,
                  display: 'flex',
                  width: '60%',
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 40,
                }}
                onPress={() => {
                  Login();
                }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{ width: '90%' }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              borderColor: '#00EEEE',
              borderWidth: 2,
              width: 50,
              height: 50,
              borderRadius: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ rotate: '180deg' }],
            }}>
            <EnterArrow width="40px" height="40px" color="#00EEEE" />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholderTextColor="#00b0eE"
          placeholder={userContext?.user?.name}
          style={{
            borderColor: '#00EEEE',
            width: '70%',
            paddingLeft: 10,
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            fontSize: 17,
          }}
          onChangeText={(e) => setChangeName(e)}
        />
        <TextInput
          placeholderTextColor="#00b0eE"
          placeholder={userContext?.user?.email}
          style={{
            borderColor: '#00EEEE',
            width: '70%',
            paddingLeft: 10,
            height: 50,
            borderRadius: 10,
            borderWidth: 2,
            fontSize: 17,
          }}
          onChangeText={(e) => setChangeEmail(e)}
        />
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            secureTextEntry
            textContentType="password"
            placeholderTextColor="#00b0eE"
            placeholder="********"
            editable={proven}
            style={{
              borderColor: '#00EEEE',
              width: '70%',
              paddingLeft: 10,
              height: 50,
              borderRadius: 10,
              borderWidth: 2,
              fontSize: 17,
            }}
            onChangeText={(e) => setNewPassword(e)}
          />
          {!proven && (
            <TouchableOpacity
              style={{
                borderColor: '#00EEEE',
                borderWidth: 1,
                height: '100%',
                position: 'absolute',
                width: '15%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setPopUp(true);
              }}>
              <Text>change</Text>
            </TouchableOpacity>
          )}
        </View>
        {errorMessage && (
          <Text style={{ color: 'red', fontWeight: '500', fontSize: 15 }}>{errorMessage}</Text>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: '#0077EE',
            borderColor: '#00EEEE',
            borderWidth: 2,
            borderRadius: 10,
            display: 'flex',
            width: '60%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            Change();
          }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
