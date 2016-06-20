'use strict';

import React, { Component } from 'react';
import ReactNative, {
  View,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  RecyclerViewBackedScrollView
} from 'react-native';

import RNRF, { Actions } from 'react-native-router-flux';

const TEXT_COLOR = '#414141'
const HIGHLIGHT_COLOR = '#EEEEEE'

const defaultStyle = {
  image: {
    width: 100,
    height: 70,
    resizeMode: 'cover'
  },
  title: {
    flex: 1,
    color: TEXT_COLOR,
    fontSize: 15
  },
  from: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    paddingTop: 2
  },
  comment: {
    fontSize: 12,
    color: TEXT_COLOR
  }
}

export default class NewsBoard extends Component {
  constructor(props) {
    super(props)
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: dataSource.cloneWithRows(props.items || [])
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.items||[])
    });
  }

  _pressRow(item) {
    Actions.newsDetail({item})
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight style={{flex: 1, backgroundColor: 'white'}}
        onPress={() => {
          this._pressRow(rowData);
          highlightRow(sectionID, rowID);
        }}
        underlayColor={HIGHLIGHT_COLOR}>
        <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
          <Image style={defaultStyle.image} source={{uri: rowData.get('previewImageLink')}}/>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={defaultStyle.title}>
              {rowData.get('newsTitle')}
            </Text>
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={defaultStyle.from}>
                {rowData.get('whereFrom')}
              </Text>
              <Text style={defaultStyle.comment}>
                {rowData.get('commentCount') + ' 评论'}
              </Text>
            </View>
          </View>
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
        <ListView enableEmptySections
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator.bind(this)}
          {...this.props}/>
    );
  }
}
