import { Text, View } from 'react-native';

interface Colors {
  title: string;
  description: string;
  color: string;
}

export const Pictures = ({ title, description, color }: Colors): React.ReactNode => {
  return (
    <View style={{ gap: 20, width: '100%', alignItems: 'center', marginTop: 20 }}>
      <View style={{ width: '90%', height: 250, borderRadius: 10, backgroundColor: `${color}` }} />
      <Text style={{ fontSize: 30 }}>{title}</Text>
      <Text style={{ fontSize: 20 }}>{description}</Text>
    </View>
  );
};
