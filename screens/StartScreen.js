import { DangerZone, GestureHandler } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';

const { Print } = DangerZone;
const { BorderlessButton } = GestureHandler;

export default class StartScreen extends React.Component {
  static propTypes = {
    onStart: PropTypes.func.isRequired,
  };

  render() {
    return (
      <SafeAreaView style={[styles.container, this.props.style]}>
        <Text style={styles.nameText}>Canvas Contraption</Text>
        <Text style={styles.welcomeText}>
          Hello and welcome to the Canvas Contraption! The Contraption channels your creativity and
          crafts an art piece just for you.
        </Text>
        {Platform.OS === 'ios'
          ? this._renderIOSPrinterNotice()
          : this._renderAndroidPrinterNotice()}
        <BorderlessButton onPress={this._start} style={styles.startButton}>
          <Text style={styles.startButtonText}>Turn on the Contraption</Text>
        </BorderlessButton>

        <Image source={require('../assets/palette.png')} style={styles.paletteIcon} />
      </SafeAreaView>
    );
  }

  _start = async () => {
    // On iOS, get the printer info up front
    if (Platform.OS === 'ios') {
      let printer = await Print.selectPrinterAsync();
      this.props.onStart({ printer });
    } else {
      this.props.onStart({});
    }
  };

  _renderIOSPrinterNotice() {
    return (
      <Text style={styles.printerNotice}>
        The Canvas Contraption needs to print from your phone. You will need an AirPrint-capable
        printer set up with your iOS device.
      </Text>
    );
  }

  _renderAndroidPrinterNotice() {
    return (
      <Text style={styles.printerNotice}>
        The Canvas Contraption needs to print from your phone. You can use a printer set up with
        Google Cloud Print on your Android device.
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  nameText: {
    fontFamily: 'idolwild',
    fontSize: 44,
    fontWeight: '300',
    marginBottom: 20,
    marginHorizontal: 24,
    marginTop: 80,
    textAlign: 'center',
  },
  welcomeText: {
    fontFamily: 'idolwild',
    fontSize: 21,
    marginHorizontal: 24,
    marginTop: 20,
    textAlign: 'center',
  },
  printerNotice: {
    marginTop: 20,
    marginHorizontal: 24,
    textAlign: 'center',
  },
  startButton: {
    alignSelf: 'center',
    marginTop: 32,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  startButtonText: {
    color: 'rgb(0, 122, 255)',
    fontFamily: 'idolwild',
    fontSize: 21,
  },
  paletteIcon: {
    alignSelf: 'center',
    marginTop: 8,
    width: 200,
    height: 200,
  },
});
