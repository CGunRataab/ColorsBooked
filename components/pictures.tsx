import { Text, View } from 'react-native';

interface Colors {
  title: string;
  description: string;
  color: string;
}

export const Pictures = ({ title, description, color }: Colors): React.ReactNode => {
  return (
    <View
      style={{
        gap: 20,
        width: '100%',
        justifyContent: 'center',
        height: 700,
        borderColor: 'grey',
        borderTopWidth: 2,
      }}>
      <View style={{ width: '100%', height: 500, backgroundColor: `${color}` }} />
      <View style={{}}>
        <Text style={{ fontSize: 30 }}>{title}</Text>
        <Text style={{ fontSize: 20 }}>{description}</Text>
      </View>
    </View>
  );
};
