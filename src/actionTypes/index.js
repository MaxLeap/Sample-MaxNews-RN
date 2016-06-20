'use strict';

import news from './news';
import newsContent from './newsContent';
import comments from './comments';
import favorite from './favorite';

export default {
  ...news,
  ...newsContent,
  ...comments,
  ...favorite
}
