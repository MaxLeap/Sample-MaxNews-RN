'use strict';

import React, {Component} from 'react';
import ReactNative, {
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import actions from '../../../actions';

import NoUser from './nouser'
import UserInfo from './userInfo'

class AccountInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currentUser) {
      return <UserInfo {...this.props}/>
    } else {
      return <NoUser />
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.maxlogin.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  const creators = new Map()
  .merge(actions.account)
  .filter(value => typeof value === 'function')
  .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
