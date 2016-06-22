'use strict';

import React, { Component } from 'react';
import ReactNative, { AppRegistry, StatusBar, Platform } from 'react-native';

import { Provider } from 'react-redux';

import store from './store';
import Launcher from './containers';
import Actions from './actions'

import RNRF, {
  Router
} from 'react-native-router-flux';

class Main extends Component {
  componentWillMount() {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content', true);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Launcher />
      </Provider>
    );
  }
}

export default function native(platform) {
  store.dispatch(Actions.account.getCurrentUserAsync())
  AppRegistry.registerComponent('MaxNews', () => Main);
}
