import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// The 'navigation' and route props are provided by the Navigator in App.js.
const Chat = ({ route, navigation }) => {
  // These props are passed via the 'navigate' method.
  const { name, background } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name || 'No Name Specified' });
  }, []);

  return (
    // More functionality to come in later exercises.
    //
    // Set the backgroundColor with the background passed in.
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
