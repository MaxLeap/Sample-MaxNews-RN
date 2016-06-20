'use strict';

import { addPrefix } from './util';

export default addPrefix([
  'CONTENT_REQUEST_START',
  'CONTENT_REQUEST_SUCCESS',
  'CONTENT_REQUEST_FAILURE'
], 'MAXNEWS_')
