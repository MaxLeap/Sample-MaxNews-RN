'use strict';

import React, { Component } from 'react';
import ReactNative, { AppRegistry } from 'react-native';

import { Provider } from 'react-redux';

import store from './store';
import Launcher from './containers';
import Actions from './actions'

import RNRF, {
  Router
} from 'react-native-router-flux';

class Main extends Component {
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
