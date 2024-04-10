import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

interface Colors {
  id: string;
  title: string;
  description: string;
  color: { hex: string };
  photo: string;
  username: string;
}
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const Pictures = ({
  id,
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
      <TouchableWithoutFeedback
        onPress={() => {
          router.push({ pathname: `/insidePic`, params: { id } });
        }}>
        <Image
          style={{ width: '100%', height: 450, borderWidth: 2, borderColor: 'black' }}
          source={photo}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
      </TouchableWithoutFeedback>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 30 }}>{title}</Text>
        <Text style={{ fontSize: 20 }}>
          {description} / {color.hex}
        </Text>
      </View>
    </View>
  );
};
