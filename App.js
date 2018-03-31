import { AppLoading, Asset, Font } from 'expo';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import CreatingScreen from './screens/CreatingScreen';
import DoneScreen from './screens/DoneScreen';
import PrintingScreen from './screens/PrintingScreen';
import StartScreen from './screens/StartScreen';

export default class App extends React.Component {
  _screenComponent = null;
  _screenOpacity = new Animated.Value(1);

  state = {
    didLoadAssets: false,
    // start | creating | printing | done
    screenId: 'start',
    priorScreenId: null,
    art: null,
    printer: null,
  };

  render() {
    if (!this.state.didLoadAssets) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={this._onLoadAssets}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>
        {/* {this.state.priorScreenId ? (
          <View style={styles.screenContainer}>{this._renderScreen(this.state.priorScreenId)}</View>
        ) : null} */}
        <Animated.View style={[styles.screenContainer, { opacity: this._screenOpacity }]}>
          {this._renderScreen(this.state.screenId)}
        </Animated.View>
      </View>
    );
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      idolwild: require('./assets/idolwild.ttf'),
    });

    // Don't wait for these
    Asset.loadAsync([
      require('./assets/videos/earth.mp4'),
      require('./assets/videos/printing.mp4'),
      require('./assets/videos/confetti.mp4'),
    ]);
  };

  _onLoadAssets = () => {
    this.setState({ didLoadAssets: true });
  };

  _transitionToScreen = nextScreenId => {
    this.setState(
      state => ({
        screenId: nextScreenId,
        priorScreenId: state.screenId,
      }),
      () => {
        this._animateScreen(({ finished }) => {
          if (finished) {
            this.setState({ priorScreenId: null });
          }
        });
      }
    );
  };

  _animateScreen(onAnimationEnd) {
    // this._screenOpacity.setValue(0);
    Animated.timing(this._screenOpacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start(onAnimationEnd);
  }

  _renderScreen(screenId) {
    switch (screenId) {
      case 'start':
        return <StartScreen ref={this._setScreenRef} onStart={this._handleStart} />;
      case 'creating':
        return <CreatingScreen ref={this._setScreenRef} onArtCreated={this._handleArtCreated} />;
      case 'printing':
        return (
          <PrintingScreen
            art={this.state.art}
            printer={this.state.printer}
            ref={this._setScreenRef}
            onArtPrinted={this._handleArtPrinted}
          />
        );
      case 'done':
        return <DoneScreen ref={this._setScreenRef} />;
      case 'end':
    }
    throw new Error(`Cannot render screen with an unknown screen ID: ${screenId}`);
  }

  _setScreenRef = component => {
    this._screenComponent = component;
  };

  _handleStart = ({ printer }) => {
    this.setState({ printer });
    this._transitionToScreen('creating');
  };

  _handleArtCreated = ({ art }) => {
    this.setState({ art });
    this._transitionToScreen('printing');
  };

  _handleArtPrinted = () => {
    this._transitionToScreen('done');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
