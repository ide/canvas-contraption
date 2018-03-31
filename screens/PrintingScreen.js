import { DangerZone, Video } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, StyleSheet, Text, View, Platform } from 'react-native';

const { Print } = DangerZone;

export default class CreatingScreen extends React.Component {
  static propTypes = {
    art: PropTypes.object.isRequired,
    printer: PropTypes.object,
    onArtPrinted: PropTypes.func.isRequired,
  };

  state = {
    errorMessage: null,
  };

  componentDidMount() {
    this._printArtAsync().catch(error => {
      Alert.alert(
        'Saving the Trees',
        `The Contraption has become environmentally conscious and is refusing to print to save the trees.`,
        [{ text: 'OK', onPress: () => {} }]
      );
      console.warn(error);
    });
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Video
          source={require('../assets/videos/printing.mp4')}
          rate={1.0}
          isMuted
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ aspectRatio: 1 }}
        />
        <Text style={styles.progressText}>Printing...</Text>
      </View>
    );
  }

  async _printArtAsync() {
    let html = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { display: flex; flex-direction: column; align-items: center; }
      img { width: 80%; }
      span { margin-top: 32px; }
    </style>
  </head>
  <body>
    <img src="${this.props.art.uri}" />
    <span>Made with things somewhere by the Canvas Contraption 🎨</span>
  </body>
</html>
`;

    let printOptions = { html };
    if (Platform.OS === 'ios') {
      printOptions.printerUrl = this.props.printer.url;
    }
    await Print.printAsync(printOptions);

    await _sleepAsync(6000);
    this.props.onArtPrinted();
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
