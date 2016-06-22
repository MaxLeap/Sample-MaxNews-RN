'use strict';

import React, {Component} from 'react';
import ReactNative, {
  View,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  RecyclerViewBackedScrollView
} from 'react-native';
import { Map } from 'immutable'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import LinearGradient from 'react-native-linear-gradient';

const TEXT_COLOR = '#414141'
const HIGHLIGHT_COLOR = '#EEEEEE'

export default class MyComments extends React.Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource: dataSource.cloneWithRows([])
    }
    this.props.actions.fetchMyComments(props.currentUser)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comments.items) {
      let dataSource = this.state.dataSource.cloneWithRows(nextProps.comments.items || [])
      this.setState({
        dataSource
      });
    }
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {

    let month = rowData.createdAt.getMonth()
    let day = rowData.createdAt.getDay()
    let year = rowData.createdAt.getYear()
    let timeDesc = '发表于：'+month+'/'+day+'/'+year

    let text = timeDesc + ' -> ' + rowData.get('commentContent')
    let news = rowData.get('commentedNews')
    let title = (news && news.get('newsTitle')) || ''
    let detail = '[原文]'+ title

    return (
      <TouchableHighlight style={{flex: 1, backgroundColor: 'white'}}
        onPress={() => {
          highlightRow(sectionID, rowID);
        }}
        underlayColor={HIGHLIGHT_COLOR}>
        <View style={{flex: 1, padding: 12}}>
          <Text style={{flex: 0}}>{text}</Text>
          <Text style={{marginLeft: 10, marginTop: 7}}>
            {detail}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    let key = 'separator_'+sectionID+rowID
    return <View key={key} style={{height: 0.5, backgroundColor: '#999999', marginLeft: 10}}/>
  }

  render() {
    return (
      <ListView style={{flex: 1, marginTop: this.props.navigationBarStyle.height}}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator.bind(this)}
        enableEmptySections/>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.maxlogin.currentUser,
    comments: state.comments.mine
  };
}

function mapDispatchToProps(dispatch) {
  const creators = new Map()
  .merge({...actions.comments})
  .filter(value => typeof value === 'function')
  .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComments);
