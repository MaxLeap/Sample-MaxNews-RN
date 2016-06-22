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
import { connect } from 'react-redux';

import RNRF, {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import DefaultAvatar from '../../resources/images/ic_personal_head@2x.png';

const TEXT_COLOR = '#414141'
const HIGHLIGHT_COLOR = '#EEEEEE'
const styles = {
  linearGradient: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  avatar: {
    height: 75,
    width: 75,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: '#fd7723',
    backgroundColor: 'transparent',
    resizeMode: 'cover'
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

class AccountCenter extends Component {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (prevSectionData, nextSectionData) => prevSectionData !== nextSectionData
    })
    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(this._rowDataList()),
      avatar: DefaultAvatar
    }
  }

  _rowDataList() {
    return {
      s0: {
        r0: {
          title: '收藏文章',
          detail: '>',
          onPress: ()=> {
            if (this.props.currentUser) {
              Actions.favorite()
            } else {
              alert('请先登录')
            }
          }
        },
        r1: {
          title: '评论记录',
          detail: '>',
          onPress: ()=> {
            if (this.props.currentUser) {
              Actions.myComments()
            } else {
              alert('请先登录')
            }
          }
        }
      },
      s1: {
        r0: {
          title: '支持帮助',
          detail: '>',
          onPress: ()=> Actions.help()
        },
        r1: {
          title: '版本',
          detail: '1.0(100)'
        }
      }
    }
  }

  _renderListHeader() {
    let avatarLink = this.props.currentUser && this.props.currentUser.get('iconUrl')
    let btnText = this.props.currentUser ? '账号信息' : '登录／注册'
    let navbarHeight = this.props.navigationBarStyle.height

    return (
      <View style={{height: styles.linearGradient.height+300, marginTop: -300 + navbarHeight, backgroundColor: '#fd7723'}}>
        <LinearGradient
          start={[1.0, 0.0]} end={[1.0, 1.0]}
          colors={['#fd7723', '#faae75']}
          style={[styles.linearGradient, {marginTop: 300}]}>
          <Image style={styles.avatar} source={avatarLink ? {uri: avatarLink} : DefaultAvatar} />
          <TouchableHighlight style={styles.button}
                              underlayColor={'#faaf76'}
                              onPress={e=>Actions.accountInfo()}>
            <Text style={styles.buttonText}>{btnText}</Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    )
  }

  _renderSectionHeader(sectionData, sectionID) {
    if (sectionID === 's0') {
      return null
    }
    let sTop = this._renderSeparator('g0_'+sectionID+'top', 'r1')
    let sBtm = this._renderSeparator('g0_'+sectionID+'btm', 'r1')
    return (
      <View style={styles.sectionHeader}>
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
      <ListView style={{flex: 1, backgroundColor: '#f5f5f5'}}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        dataSource={this.state.dataSource}
        renderHeader={this._renderListHeader.bind(this)}
        renderSectionHeader={this._renderSectionHeader.bind(this)}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator.bind(this)}/>
    );
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.maxlogin.currentUser
  };
}

export default connect(mapStateToProps)(AccountCenter);
