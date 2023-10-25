import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, background } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name || 'No Name Specified' });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={{ color: 'white' }}>Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Chat;
