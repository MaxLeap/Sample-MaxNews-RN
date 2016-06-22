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

import RNRF, {Actions} from 'react-native-router-flux';
import HelpCenter from 'maxleap-helpcenter-react-native';

const TEXT_COLOR = '#414141'
const HIGHLIGHT_COLOR = '#EEEEEE'
const styles = {
  button: {
    width: 150,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fd7723',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  cell: {
    style: {
      height: 44,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    title: {
      fontSize: 17
    },
    detail: {
      fontSize: 17
    }
  },
  sectionHeader: {
    backgroundColor:'transparent',
    height: 10,
    justifyContent: 'space-between'
  }
}

export default class AccountCenter extends React.Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(this._rowDataList())
    }
  }

  _rowDataList() {
    return {
      s0:[
        {
          title: 'FAQ',
          detail: '>',
          onPress: ()=> HelpCenter.showFAQs()
        },{
          title: 'Ask Support(Email)',
          detail: '>',
          onPress: ()=> alert('not implemented yet')
        },{
          title: 'Ask Support(Chat with us)',
          detail: '>',
          onPress: ()=> HelpCenter.showConversation()
        }
      ]
    }
  }

  _renderSectionHeader(sectionData, sectionID) {
    let height = 20
    let sTop = this._renderSeparator('g0_'+sectionID+'top', 'r1')
    let sBtm = this._renderSeparator('g0_'+sectionID+'btm', 'r1')
    return (
      <View style={[styles.sectionHeader, {height}]}>
        {sTop}
        {sBtm}
      </View>
    )
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    let rightItem = rowData.detail ?
    <Text>{rowData.detail}</Text> :
      <Image style={{flex:0}} source={{uri: ''}}/>

      return (
        <TouchableHighlight style={styles.cell.style}
          onPress={() => {
            rowData.onPress && rowData.onPress(rowData, sectionID, rowID);
            highlightRow(sectionID, rowID);
          }}
          underlayColor={HIGHLIGHT_COLOR}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
            <Text style={styles.cell.title}>
              {rowData.title}
            </Text>
            {rightItem}
          </View>
        </TouchableHighlight>
      )
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
      let key = 'separator_'+sectionID+rowID
      let marginLeft = rowID==='r1' ?0:10
      return <View key={key} style={{height: 0.5, backgroundColor: '#c8c8ca', marginLeft}}/>
    }

    render() {
      return (
        <ListView style={{flex: 1, marginTop: this.props.navigationBarStyle.height, backgroundColor: '#f5f5f5'}}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator.bind(this)}/>
      );
    }
  }
