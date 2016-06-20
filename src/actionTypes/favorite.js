'use strict';

import { addPrefix } from './util';

export default addPrefix([
  'ADD_TO_FAVORITES_START',
  'ADD_TO_FAVORITES_SUCCESS',
  'ADD_TO_FAVORITES_FAILURE',

  'GET_MYFAVORITES_REQUEST_START',
  'GET_MYFAVORITES_REQUEST_SUCCESS',
  'GET_MYFAVORITES_REQUEST_FAILURE'
], 'MAXNEWS_')
