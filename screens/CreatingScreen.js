import { Video } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import ArtPiece from '../ArtPiece';

export default class CreatingScreen extends React.Component {
  static propTypes = {
    onArtCreated: PropTypes.func.isRequired,
  };

  state = {
    errorMessage: null,
  };

  componentDidMount() {
    this._createArtAsync().catch(error => {
      Alert.alert('Out of Creativity', `The Contraption is running low on creativity right now`, [
        { text: 'OK', onPress: () => {} },
      ]);
      console.warn(error);
    });
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Video
          source={require('../assets/videos/earth.mp4')}
          rate={1.0}
          isMuted
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ aspectRatio: 1 }}
        />
        <Text style={styles.progressText}>Creating art...</Text>
      </View>
    );
  }

  async _createArtAsync() {
    let artSource = await ArtPiece.getArtworkSourceAsync();
    await _sleepAsync(6000);
    this.props.onArtCreated({ art: artSource });
  }
}

function _sleepAsync(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexGrow: 1,
    justifyContent: 'center',
  },
  progressText: {
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'idolwild',
    fontSize: 28,
    marginTop: 12,
  },
});
