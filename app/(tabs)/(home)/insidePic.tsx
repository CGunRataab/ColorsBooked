import { EnterArrow } from '@/assets/images/enterArrow';
import { useQuery } from '@apollo/client';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import gql from 'graphql-tag';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

const GET_PICTURE = gql`
  query GetPicture($id: ID) {
    getPicture(id: $id) {
      color {
        r
        hex
        g
        b
      }
      description
      username
      photo
      title
    }
  }
`;

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function InsideImage(): React.ReactNode {
  const params = useLocalSearchParams();
  const id = params.id;
  const { data, loading } = useQuery(GET_PICTURE, { variables: { id } });
  if (loading) return <Text>Loading...</Text>;
  const { getPicture } = data;

  return (
    <View
      style={{
        gap: 20,
        width: '100%',
        paddingTop: 30,
        height: Dimensions.get('screen').height,
        borderTopWidth: 2,
        backgroundColor: '#fff',
      }}>
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
      <Text style={{ fontSize: 30, marginLeft: 10, fontWeight: '500' }}>{getPicture.username}</Text>

      <Image
        style={{ width: '100%', height: 500, borderWidth: 2, borderColor: 'black' }}
        source={getPicture.photo}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 35 }}>{getPicture.title}</Text>
        <Text style={{ fontSize: 20 }}>
          {getPicture.description} / {getPicture.color.hex}
        </Text>
      </View>
    </View>
  );
}
