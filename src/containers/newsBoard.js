'use strict';

import React, { Component } from 'react';
import ReactNative, {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

import RNRF, {
  Actions
} from 'react-native-router-flux';

import Carousel from 'react-native-looped-carousel';
import Spinner from 'react-native-loading-spinner-overlay';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import actions from '../actions';
import CategoryView from '../components/categoryView';
import NewsList from '../components/newsList'

const HIGHLIGHT_COLOR = '#EEEEEE'

class NewsBoard extends Component {
  constructor(props) {
    super(props)
    this.props.actions.fetchCategories(()=>{
      this._onSelectCategoryAtIndex(0)
    })
  }

  _categoryNames() {
    return this.props.state.categories.map((item) => {return item.get('categoryName')})
  }

  _selectedIndex() {
    if (!this.props.state.selectedCategory) {
      return 0
    }
    return this.props.state.categories.findIndex(e=>e.id === this.props.state.selectedCategory)
  }

  _onSelectCategoryAtIndex(index) {
    let obj = this.props.state.categories[index];
    let cid = obj && obj.id
    if (!cid) {
      return
    }
    this.props.actions.selectCategory(cid)
    let items = this.props.state.items && this.props.state.items[cid]
    if (!items) {
      this.props.actions.refresh(cid)
    }
  }

  _renderHeaderItem(item) {
    return (
      <TouchableHighlight key={item.id}
        style={{flex:1}}
        onPress={() => Actions.newsDetail({item})}
        underlayColor={HIGHLIGHT_COLOR}>
        <Image style={{flex:1}} source={{uri: item.get('standardImageLink')}} />
      </TouchableHighlight>
    )
  }

  _renderListHeader() {
    let items = this._getNewsList() || []
    let views = items ? items.map(crt => this._renderHeaderItem(crt)) : []
    return (
      <Carousel style={{height: 200, backgroundColor: HIGHLIGHT_COLOR}}
        pageInfo={true}
        pageInfoTextSeparator={'/'}
        pageInfoBackgroundColor={'#999999'}>
        {views}
      </Carousel>
    )
  }

  _getNewsList() {
    let cid = this.props.state.selectedCategory
    let items = this.props.state.items
    let seletedNews = cid && items && items[cid]
    return seletedNews
  }

  render() {
    let marginTop = this.props.navigationBarStyle.height

    if (this.props.state.isFetching) {
      return <Spinner visible />
    }
    if (this.props.state.categories.length === 0) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>没有数据！</Text>
        </View>
      )
    }

    let newsList = this._getNewsList()
    return (
      <View style={{flex:1, marginTop}}>
        <CategoryView style={{padding: 10, flex: 0, backgroundColor: 'white'}}
          selectedIndex={this._selectedIndex()}
          onSelectIndex={index=>this._onSelectCategoryAtIndex(index)}
          categories={this._categoryNames()}/>
        <View style={{height:0.5, backgroundColor:'#777777'}} />
        {newsList ?(
          <NewsList style={{flex: 1}}
            items={newsList}
            renderHeader={this._renderListHeader.bind(this)}/>
        ): <Text style={{alignSelf: 'center'}}>没有数据！</Text>}
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    state: state.news
  };
}

function mapDispatchToProps(dispatch) {
  const creators = new Map()
  .merge(actions.news)
  .filter(value => typeof value === 'function')
  .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsBoard);
