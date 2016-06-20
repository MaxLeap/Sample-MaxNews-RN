'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';

import RNRF, {
  Actions,
  Scene,
  Modal,
  Router
} from 'react-native-router-flux';

import NewsBoard from './newsBoard';
import NewsDetail from './newsDetail';

import AccountCenter from './account/accountCenter';
import AccountInfo from './account/accountInfo';
import Login from './account/login';
import Register from './account/register';
import OtherLogin from './account/otherLogin';

import Favorite from './favorite';
import MyComments from './myComments';
import Help from './help';

import personIcon from '../resources/images/btn_nav_personal_normal@2x.png';

const styles = {
  navBar: {
    backgroundColor: '#fd7723',
  },
  tabBar: {
    borderTopWidth: 0.5,
    borderTopColor: '#DDDDDD'
  },
  buttonIcon: {
    resizeMode: 'contain',
    // ios
    tintColor: 'white',
    // android
    overlayColor: 'white'
  },
  buttonText: {
    fontSize: 13,
    color: 'white'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal'
  }
};

export default class Launcher extends Component {
  commonNavConfig() {
    return {
      navigationBarStyle: styles.navBar,
      titleStyle: styles.title,
      leftButtonIconStyle: styles.buttonIcon,
      leftButtonTextStyle: styles.buttonText,
      rightButtonTextStyle: styles.buttonText
    };
  }

  newsListNavConfig() {
    let common = this.commonNavConfig()
    return {
      ...common,
      title: '新闻',
      rightButtonImage: personIcon,
      onRight: () => {
        Actions.account()
      }
    };
  }

  render() {
    return (
      <Router {...this.props}>
        <Scene key='news' {...this.commonNavConfig()}>
          <Scene key='newsList' component={NewsBoard} {...this.newsListNavConfig()} initial/>
          <Scene key='newsDetail' component={NewsDetail} title='新闻内容'/>
          <Scene key='account' component={AccountCenter} title='个人中心'/>
          <Scene key='accountInfo' component={AccountInfo} title='个人信息'/>
          <Scene key='favorite' component={Favorite} title='我的收藏'/>
          <Scene key='myComments' component={MyComments} title='我的评论'/>
          <Scene key='help' component={Help} title='帮助与支持'/>
          <Scene key='login' component={Login} title='登录'/>
          <Scene key='register' component={Register} title='注册'/>
          <Scene key='otherLogin' component={OtherLogin} title='其它登录'/>
        </Scene>
      </Router>
    )
  }
}
