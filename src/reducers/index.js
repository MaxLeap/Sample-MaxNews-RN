'use strict';

import MaxLogin, { reducers } from 'maxlogin-react-native'

import { combineReducers } from 'redux';
import * as news from './news';
import * as newsContent from './newsContent';
import * as comments from './comments';
import * as favorite from './favorite';

export default combineReducers({
  ...news,
  ...reducers,
  ...newsContent,
  ...comments,
  ...favorite
})
