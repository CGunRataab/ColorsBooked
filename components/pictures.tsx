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
  // if (photo) {
  //   console.log(photo);
  // }
  return (
    <View
      style={{
        gap: 20,
        width: '100%',
        paddingTop: 20,
        height: 700,
        borderColor: 'grey',
        borderTopWidth: 2,
      }}>
      <Text style={{ fontSize: 20, marginLeft: 10 }}>{username}</Text>
      <Image style={{ width: '100%', height: 500 }} source={{ uri: photo }} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 30 }}>{title}</Text>
        <Text style={{ fontSize: 20 }}>
          {description}/{color}
        </Text>
      </View>
    </View>
  );
};
