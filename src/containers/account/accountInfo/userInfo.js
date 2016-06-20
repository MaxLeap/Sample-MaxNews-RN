'use strict';

import React, {Component} from 'react';
import ReactNative, {
  View,
  Text,
  Image,
  ListView,
  TextInput,
  TouchableHighlight,
  RecyclerViewBackedScrollView
} from 'react-native';

import RNRF, {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import DefaultAvatar from '../../../resources/images/default_portrait@2x.png';

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
      backgroundColor: 'white'
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10
    },
    title: {
      flex: 1,
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

const DEFAULT_IMAGEPICKER_OPTIONS = {
  title: '', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '从相册中选择', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.2, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

export default class AccountCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.currentUser.get('username'),
      mobilePhone: props.currentUser.get('mobilePhone'),
      nickname: props.currentUser.get('nickName')
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: props.currentUser.get('username'),
      mobilePhone: props.currentUser.get('mobilePhone'),
      nickname: props.currentUser.get('nickName')
    });
  }

  _changeAvatar() {
    /**
    * The first arg will be the options object for customization, the second is
    * your callback which sends object: response.
    *
    * See the README for info about the response
    */
    ImagePicker.showImagePicker(DEFAULT_IMAGEPICKER_OPTIONS, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        alert('ImagePicker Error: ', response.error);
      } else {
        this._updateAvatar(response.uri)
      }
    });
  }

  _updateAvatar(uri) {
    new ML.File('avatar.jpg', uri)
    .save()
    .then(file => {
      this._updateProfile({iconUrl: file.url()})
    })
  }

  _updateProfile(params) {
    this.props.actions.updateUser(
      params,
      () => alert('保存成功'),
      err => alert('保存失败')
    )
  }

  _rowDataList() {
    if (!this.state) {
      return []
    }
    let username = this.state.username
    let mobilePhone = this.state.mobilePhone || ''
    let nickname = this.state.nickname || ''
    let avatarURI = this.props.currentUser.get('iconUrl')
    let avatarSrc = avatarURI ? {uri: this.props.currentUser.get('iconUrl')} : DefaultAvatar

    return {
      s0:[
        {
          title: '用户名',
          detail: username,
          accessory: '>',
          editable: false
        },{
          title: '手机号',
          detail: mobilePhone,
          accessory: '>',
          onChangeText: text => this.setState({mobilePhone:text}),
          onSubmitEditing: ()=> this._updateProfile({mobilePhone: this.state.mobilePhone})
        },{
          title: '昵称',
          detail: nickname,
          accessory: '>',
          onChangeText: text => this.setState({nickname:text}),
          onSubmitEditing: ()=> this._updateProfile({nickName: this.state.nickname})
        },{
          title: '头像',
          avatar: avatarSrc,
          accessory: '>',
          onPress: ()=> this._changeAvatar()
        }
      ],
      s1: [
        {
          title: '登出',
          onPress: () => this.props.actions.logout()
        }
      ]
    }
  }

  _renderSectionHeader(sectionData, sectionID) {
    let height = 20
    let sBtm = this._renderSeparator('g0_'+sectionID+'btm', 'r1')
    return (
      <View style={[styles.sectionHeader, {height}]} />
    )
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight style={styles.cell.style}
        onPress={() => {
          rowData.onPress && rowData.onPress(rowData, sectionID, rowID);
          highlightRow(sectionID, rowID);
        }}
        underlayColor={HIGHLIGHT_COLOR}>
        <View style={styles.cell.container}>
          <Text style={styles.cell.title}>{rowData.title}</Text>
          {(rowData.detail || rowData.detail === '') ? (
            <TextInput style={{flex:2, textAlign: 'right'}}
              onChangeText={rowData.onChangeText && rowData.onChangeText.bind(this)}
              onSubmitEditing={rowData.onSubmitEditing && rowData.onSubmitEditing.bind(this)}
              editable={rowData.editable || rowData.editable === undefined}
              value={rowData.detail}/>
          ) : null}
          {rowData.avatar ? (
            <Image style={{flex:0, width: 30, height: 30, resizeMode: 'cover'}} source={rowData.avatar} />
          ) : null}
          {rowData.accessory ? <Text style={{flex:0, marginLeft: 15}}>{rowData.accessory}</Text> : null}
        </View>
      </TouchableHighlight>
    )
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    let key = 'separator_'+sectionID+rowID
    return <View key={key} style={{height: 0.5, backgroundColor: '#c8c8ca'}}/>
  }

  render() {
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
    dataSource = dataSource.cloneWithRowsAndSections(this._rowDataList())

    return (
      <ListView style={{flex: 1, marginTop: 64, backgroundColor: '#f5f5f5'}}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        dataSource={dataSource}
        renderSectionHeader={this._renderSectionHeader.bind(this)}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator.bind(this)}/>
    );
  }
}
