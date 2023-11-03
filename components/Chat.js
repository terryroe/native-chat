import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';

// The 'navigation' and route props are provided by the Navigator in App.js.
const Chat = ({ isConnected, db, route, navigation }) => {
  const [messages, setMessages] = useState([]);

  // These props are passed via the 'navigate' method.
  const { userID, name, background } = route.params;

  let unsubMessages;
  useEffect(() => {
    navigation.setOptions({ title: name || 'No Name Specified' });

    if (isConnected === true) {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setLists(JSON.parse(cachedMessages));
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
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

  const renderInputToolbar = (props) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
  };

  return (
    // Set the backgroundColor with the background passed in.
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name,
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="height" />}
      {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
