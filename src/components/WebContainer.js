'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, { WebView } from 'react-native';

class WebContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height || 100
    };
  }

  render() {
    let {
      html,
      style,
      autoHeight,
      scrollEnabled,
      ...props
    } = this.props;

    let script = 'document.title = document.body.clientHeight || document.height; window.location.hash = 1;'

    return (
      <WebView ref={'webview'}
        {...props}
        style={[style, (autoHeight ? {height: this.state.height} : {})]}
        source={{html}}
        scrollEnabled={autoHeight ? false : scrollEnabled}
        javaScriptEnabled
        domStorageEnabled
        injectedJavaScript={script}
        onNavigationStateChange={navState => {
          let height = Number(navState.title);
          if (height && height===height) {
            this.setState({height});
          }
        }}/>
      );
  }
}

WebContainer.propTypes = {
  autoHeight: PropTypes.bool
};

export default WebContainer;
