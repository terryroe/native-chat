import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const image = require('../assets/background.png');
const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

// The 'navigation' prop is provided by the Navigator in App.js.
const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [background, setBackground] = useState(colors[0]);

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Native Chat</Text>
      </View>
      <View style={styles.contentWrapper}>
        <TextInput
          style={styles.yourName}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />
        <View style={styles.colorSelector}>
          <Text style={styles.colorTitle}>Choose Background Color:</Text>
          <View style={styles.colorButtonWrapper}>
            {/* Map over the available colors and set the selected color to
                the color that matches */}
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  background === color && styles.selected,
                ]}
                // When a button is pressed set the backgroundColor to the color
                // of the selection.
                onPress={() => setBackground(color)}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          // Navigate to the Chat page passing along the name that was entered
          // and the background color that was chosen.
          onPress={() => navigation.navigate('Chat', { name, background })}
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
        {Platform.OS === 'android' && (
          <KeyboardAvoidingView behavior="height" />
        )}
        {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#757083',
    height: 60,
    justifyContent: 'center',
    marginBottom: 20,
    width: '88%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  colorButton: {
    backgroundColor: 'white',

    borderRadius: 25,
    height: 50,
    marginRight: 15,
    marginTop: 10,
    padding: 20,
    width: 50,
  },
  colorButtonWrapper: {
    flexDirection: 'row',
  },
  colorSelector: {
    flexWrap: 'wrap',
    marginTop: -25,
    width: '88%',
  },
  colorTitle: {
    color: '#757083',
    fontSize: 16,
  },
  contentWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '44%',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '88%',
  },
  image: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  selected: {
    borderColor: 'red',
    borderWidth: 3,
    padding: 5,
  },
  title: {
    alignItems: 'center',
    color: '#fff',
    fontSize: 45,
    fontWeight: '600',
    height: '44%',
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  yourName: {
    borderWidth: 1,
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 20,
    marginTop: 20,
    padding: 20,
    width: '88%',
  },
});

export default Start;
