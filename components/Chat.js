import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

// The 'navigation' and route props are provided by the Navigator in App.js.
const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);

  // These props are passed via the 'navigate' method.
  const { name, background } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name || 'No Name Specified' });
    setMessages([
      {
        _id: 1,
        text: 'You have entered the chat room',
        createdAt: new Date(),
        system: true,
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  return (
    // More functionality to come in later exercises.
    //
    // Set the backgroundColor with the background passed in.
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="height" />}
      {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1,
    // justifyContent: 'center',
  },
});

export default Chat;
