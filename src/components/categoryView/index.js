'use strict';

import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text
} from 'react-native';

const defaultStyle = StyleSheet.create({
  scrollView: {

  },
  container: {

  }
})

export default class CategoryView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: props.categories || [],
      selectedIndex: props.selectedIndex || 0
    }
  }

  componentWillReceiveProps(nextProps) {
    let selectedIndex = nextProps.selectedIndex === undefined ? this.state.selectedIndex : nextProps.selectedIndex
    this.setState({
      categories: nextProps.categories || [],
      selectedIndex
    });
  }

  _selectedIndex(index) {
    this.setState({
      selectedIndex: index
    });
    if (this.props.onSelectIndex) {
      this.props.onSelectIndex(index)
    }
  }

  render() {
    let items = this.state.categories.map((ctg, index)=>{
      let color = (index===this.state.selectedIndex) ? 'red' : '#414141'
      return (
        <Text key={index} style={{color:color, width:50}} onPress={()=>this._selectedIndex(index)}>
          {ctg}
        </Text>
      )
    })
    return (
      <ScrollView style={[defaultStyle.scrollView, this.props.style]}
        contentContainerStyle={[defaultStyle.container, this.props.contentContainerStyle]}
        horizontal={true}>
        {items}
      </ScrollView>
    )
  }
}
