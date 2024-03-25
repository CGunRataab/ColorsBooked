import { Image, Text, View } from 'react-native';

interface Colors {
  title: string;
  description: string;
  color: string;
  photo: string;
  username: string;
}

export const Pictures = ({
  title,
  description,
  color,
  photo,
  username,
}: Colors): React.ReactNode => {
  return (
    <View
      style={{
        gap: 20,
        width: '100%',
        paddingTop: 20,
        height: 700,
        borderColor: '#0077EE',
        borderTopWidth: 2,
        backgroundColor: '#fff',
      }}>
      <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: '500' }}>{username}</Text>
      <Image
        style={{ width: '100%', height: 500, borderColor: 'black', borderWidth: 2 }}
        source={{ uri: photo }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 30 }}>{title}</Text>
        <Text style={{ fontSize: 20 }}>{description}</Text>
      </View>
    </View>
  );
};
