'use strict';

import { addPrefix } from './util';

export default addPrefix([
  'COMMENT_REQUEST_START',
  'COMMENT_REQUEST_SUCCESS',
  'COMMENT_REQUEST_FAILURE',

  'GET_COMMENTS_REQUEST_START',
  'GET_COMMENTS_REQUEST_SUCCESS',
  'GET_COMMENTS_REQUEST_FAILURE',

  'MY_COMMENTS_REQUEST_START',
  'MY_COMMENTS_REQUEST_SUCCESS',
  'MY_COMMENTS_REQUEST_FAILURE'
], 'MAXNEWS_')