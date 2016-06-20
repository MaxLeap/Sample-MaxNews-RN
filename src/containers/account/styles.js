'use strict';

import { stylesheet } from 'maxlogin-react-native';

let styles = {...stylesheet}

styles.formStyle.controlLabel.normal.width = 55;
styles.formStyle.controlLabel.error.width = 55;

export default styles;
