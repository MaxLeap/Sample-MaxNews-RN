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

    return (
      <WebView ref={'webview'}
        {...props}
        injectedJavaScript={'document.body.clientHeight'}
        style={[style, (autoHeight ? {height: this.state.height} : {})]}
        scrollEnabled={autoHeight ? false : scrollEnabled}
        source={{html}}
        onLoad={e => this.setState({height: Number(e.nativeEvent.jsEvaluationValue)})}/>
    );
  }
}

WebContainer.propTypes = {
  autoHeight: PropTypes.bool
};

export default WebContainer;
