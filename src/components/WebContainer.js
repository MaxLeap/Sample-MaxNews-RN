'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, { WebView } from 'react-native';

const script = '<script>window.location.hash = 1;document.title = document.height;</script>';

class WebContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height || 0
    };
  }

  onNavigationStateChange(navState) {
    this.setState({
      height: navState.title
    });
  }

  render() {
    let {
      html,
      style,
      autoHeight,
      scrollEnabled,
      ...props
    } = this.props;

    html = autoHeight ? (html + script) : html

    return (
      <WebView ref={'webview'}
        {...props}
        style={[style, (autoHeight ? {height: Number(this.state.height)} : {})]}
        scrollEnabled={autoHeight ? false : scrollEnabled}
        source={{html}}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}/>
    );
  }
}

WebContainer.propTypes = {
  autoHeight: PropTypes.bool
};

export default WebContainer;
