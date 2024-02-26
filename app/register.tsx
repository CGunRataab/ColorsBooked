import { Link, router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function Register(): React.ReactNode {
  const Register = (): void => {
    router.replace('/(tabs)');
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        paddingBottom: 50,
      }}>
      <Text style={{ fontSize: 80 }}>Register</Text>
      <View
        style={{
          borderColor: 'black',
          borderWidth: 3,
          width: '90%',
          height: '70%',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 2,
            width: '80%',
            height: 80,
            borderRadius: 10,
            paddingLeft: 15,
            fontSize: 20,
          }}
          placeholder="Enter Name"
          placeholderTextColor="black"
        />
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 2,
            width: '80%',
            height: 80,
            borderRadius: 10,
            paddingLeft: 15,
            fontSize: 20,
          }}
          placeholder="Enter Email"
          placeholderTextColor="black"
        />
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 2,
            width: '80%',
            height: 80,
            borderRadius: 10,
            paddingLeft: 15,
            fontSize: 20,
          }}
          placeholder="Enter Password"
          placeholderTextColor="black"
        />
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 2,
            width: '80%',
            height: 80,
            borderRadius: 10,
            paddingLeft: 15,
            fontSize: 20,
          }}
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
          <TouchableOpacity
            onPress={Register}
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
            <Text style={{ fontSize: 25 }}>Register</Text>
          </TouchableOpacity>
          <Link
            href="../"
            style={{ width: '75%', fontSize: 15, textAlign: 'right', color: '#0000EE' }}>
            Login
          </Link>
        </View>
      </View>
    </View>
  );
}
