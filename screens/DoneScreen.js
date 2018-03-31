import { Video } from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DoneScreen extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Video
          source={require('../assets/videos/confetti.mp4')}
          rate={1.0}
          isMuted
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.confetti}
        />
        <Text style={styles.doneText}>Check your printer!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexGrow: 1,
    justifyContent: 'center',
  },
  confetti: {
    aspectRatio: 9 / 16,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  doneText: {
    color: '#fff',
    fontFamily: 'idolwild',
    fontSize: 48,
    textAlign: 'center',
  },
});
