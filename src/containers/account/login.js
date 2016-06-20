'use strict';

import React, {Component} from 'react';
import ReactNative, {
  View,
  ScrollView,
  Platform
} from 'react-native';

import RNRF, { Actions } from 'react-native-router-flux';
import MaxLogin, { Login } from 'maxlogin-react-native'

import formStyle from './styles';

export default class AccountCenter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={{flex: 1, marginTop: 64, backgroundColor: '#f5f5f5'}}>
        <Login style={Platform.OS === 'android'?formStyle:undefined}
          onSuccess={user=> Actions.pop()}
          onFailure={e=>alert(e)}/>
      </ScrollView>
    );
  }
}
