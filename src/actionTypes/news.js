'use strict';

import { addPrefix } from './util';

export default addPrefix([
  'NEWS_CATEGORY_REQUEST_START',
  'NEWS_CATEGORY_REQUEST_SUCCESS',
  'NEWS_CATEGORY_REQUEST_FAILURE',

  'NEWS_REFRESH_START',
  'NEWS_REFRESH_SUCCESS',
  'NEWS_REFRESH_FAILURE',

  'NEWS_LOADMORE_START',
  'NEWS_LOADMORE_SUCCESS',
  'NEWS_LOADMORE_FAILURE',

  'NEWS_SELECT_CATEGORY'
], 'MAXNEWS_')