import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
