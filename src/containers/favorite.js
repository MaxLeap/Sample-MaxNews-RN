'use strict';

import React, {Component} from 'react';
import ReactNative, {
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import actions from '../actions';

import NewsList from '../components/newsList'

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.props.actions.fetchFavorites({
      user: this.props.currentUser
    })
  }
  render() {
    let items = this.props.collections.map(o => o.get('collectedNews'))
    return (
      <NewsList style={{flex: 1, marginTop: this.props.navigationBarStyle.height}}
        items={items}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    collections: state.favorite.collections,
    currentUser: state.maxlogin.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  const creators = new Map()
  .merge(actions.favorite)
  .filter(value => typeof value === 'function')
  .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
