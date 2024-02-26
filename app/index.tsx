import { Link, router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function Login(): React.ReactNode {
  const Login = (): void => {
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
          style={{
            borderColor: 'black',
            borderWidth: 2,
            width: '80%',
            height: 80,
            borderRadius: 10,
            paddingLeft: 15,
            fontSize: 20,
          }}
          placeholder="Enter Name/Email"
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
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={Login}
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
  );
}
