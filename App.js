import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { useEffect } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC7QrgpksMgHmF2nJGjw4lzddKf8GIshtU',
  authDomain: 'native-chat-24ed3.firebaseapp.com',
  projectId: 'native-chat-24ed3',
  storageBucket: 'native-chat-24ed3.appspot.com',
  messagingSenderId: '919011059771',
  appId: '1:919011059771:web:f970f4540dad2dbc2f541e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

const Stack = createNativeStackNavigator();

export default function App() {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
