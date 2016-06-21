'use strict';

import React, {Component} from 'react';
import ReactNative, {
  View,
  Text,
  Image,
  ListView,
  Platform,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import { Map } from 'immutable'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WebContainer from '../components/WebContainer';
import actions from '../actions';

import Spinner from 'react-native-loading-spinner-overlay';

import KeyboardSpacer from '../components/KeyboardSpacer'
import DefaultAvatar from '../resources/images/default_portrait@2x.png';

const LINE_COLOR = '#777777'

export default class NewsDetail extends Component {
  constructor(props) {
    super(props)
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    let commentData = props.comments[props.item.id]
    let comments = (commentData && commentData[props.item.id]) || []
    this.state = {
      item: props.item,
      pureHtml: null,
      text: null,
      inputing: false,
      dataSource: dataSource.cloneWithRows(comments)
    }
    this.props.actions.fetchContent(this.props.item)
    this.props.actions.fetchCommentsOfNews(this.props.item)
  }

  componentWillReceiveProps(nextProps) {
    let id = nextProps.item.id
    let pureHtml = nextProps.newsContents && nextProps.newsContents[id] && nextProps.newsContents[id].data

    let commentData = id && nextProps.comments[id]
    let comments = (commentData && commentData.items) || []
    let dataSource = this.state.dataSource.cloneWithRows(comments)

    this.setState({
      item: nextProps.item,
      pureHtml,
      dataSource
    });
  }

  _renderHeader() {
    return (
      <View>
        <WebContainer ref={WEBVIEW_REF}
          style={styles.webView}
          decelerationRate="normal"
          automaticallyAdjustContentInsets
          javaScriptEnabled
          domStorageEnabled
          scalesPageToFit
          startInLoadingState
          html={this.state.pureHtml || ''}
          makeSafe
          autoHeight/>

        <View style={{height: 0.5, backgroundColor: LINE_COLOR}}></View>
      </View>
    )
  }

  _renderRow(rowData, rowID, sectionID) {
    let user = rowData.get('fromUser')
    let avatarURI = user.get('iconUrl')
    let avatarSrc = avatarURI ? {uri: avatarURI} : DefaultAvatar
    let nickName = user.get('nickName') || user.get('username')

    let month = rowData.createdAt.getMonth()
    let day = rowData.createdAt.getDay()
    let year = rowData.createdAt.getYear()
    let timeDesc = '发表于：'+month+'/'+day+'/'+year

    return (
      <TouchableHighlight style={{backgroundColor: 'white'}}
        underlayColor={'#999999'}>
        <View style={{flex: 0, flexDirection: 'row', padding: 10}}>
          <Image style={{flex: 0, height: 40, width: 40, borderRadius: 20}} source={avatarSrc}/>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={{fontSize: 15}}>{nickName}</Text>
            <Text style={{fontSize: 11, color: '#c1c1c1', marginTop: 5}}>
              {timeDesc}
            </Text>
            <Text style={{color: '#414141', marginTop: 11}}>
              {rowData.get('commentContent')}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderSeparator(sectionID, rowID) {
    return <View key={'sep'+sectionID+rowID} style={{height: 0.5, backgroundColor: LINE_COLOR}}></View>
  }

  _createComment() {
    if (!this.props.currentUser) {
      alert('请先登录！')
      return
    }
    if (!this.state.text || this.state.text.length === 0) {
      return
    }
    this.props.actions.createComment({
      user: this.props.currentUser,
      news: this.state.item,
      text: this.state.text,
      onSuccess: () => {
        alert('评论成功！')
        this.refs[TEXTINPUT_REF].clear()
        this.setState({
          text: null
        });
        this.props.actions.fetchCommentsOfNews(this.props.item)
      },
      onFailure: (e)=>alert('评论失败，原因：'+JSON.stringify(e))
    })
  }

  _renderSendBtn() {
    return (
      <TouchableHighlight
        style={{flex: 0, marginLeft: 10, marginRight: 5}}
        onPress={e=>this._createComment()}>
        <Text style={{fontSize: 17}}>发送</Text>
      </TouchableHighlight>
    )
  }

  _renderCollectBtn() {
    return (
      <TouchableHighlight
        style={{flex: 0, marginLeft: 10, marginRight: 5}}
        onPress={e=>this.props.actions.addToFavorite({
          user: this.props.currentUser,
          news: this.state.item,
          onSuccess: ()=>alert('收藏成功！'),
          onFailure: (e)=>alert('收藏失败，原因：'+JSON.stringify(e))
        })}>
        <Text style={{fontSize: 17}}>收藏</Text>
      </TouchableHighlight>
    )
  }

  render() {
    this.props.navigationState.title = this.props.item.get('newsTitle') || this.props.navigationState.title

    let content = this.props.newsContents[this.props.item.id]
    if (!content || content.isFetching) {
      return <Spinner visible/>
    }

    let btn = this.state.inputing ? this._renderSendBtn() : this._renderCollectBtn()

    return (
      <View style={{flex: 1}}>

        <ListView ref={LISTVIEW_REF}
          style={{flex: 1}}
          dataSource={this.state.dataSource}
          renderHeader={this._renderHeader.bind(this)}
          renderSectionHeader={this._renderSectionHeader}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator}
          enableEmptySections/>

        <View style={{flex: 0, height: 0.5, backgroundColor:'#777777'}}></View>

        <View style={{
            flex:0,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            backgroundColor: 'white'}}>

          <TextInput ref={TEXTINPUT_REF}
            style={{flex:1, fontSize: 15, borderWidth: 0.5, borderColor: '#777777', borderRadius: 3, marginLeft: 5, paddingLeft: 7, paddingRight: 7}}
            autoCorrect
            enablesReturnKeyAutomatically
            returnKeyType={'send'}
            clearButtonMode={'while-editing'}
            placeholder={'请输入评论内容...'}
            onChangeText={text=>this.setState({text})}
            onFocus={e=>this.setState({inputing:true})}
            onEndEditing={e=>this.setState({inputing:false})}
            onSubmitEditing={e=>this._createComment()}/>
          {btn}
        </View>

        {(Platform.OS === 'ios') ? <KeyboardSpacer /> : null}

      </View>
    );
  }
}

var WEBVIEW_REF = 'webview'
var LISTVIEW_REF = 'listview'
var TEXTINPUT_REF = 'textinput'
var BGWASH = 'rgba(255,255,255,0.8)';

var styles = StyleSheet.create({
  webView: {
    flex: 1,
    marginTop: 64,
    backgroundColor: BGWASH
  }
});

function mapStateToProps(state) {
  return {
    newsContents: state.newsContent,
    comments: state.comments.news,
    currentUser: state.maxlogin.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  const creators = new Map()
  .merge({
    ...actions.newsContent,
    ...actions.comments,
    ...actions.favorite
  })
  .filter(value => typeof value === 'function')
  .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
