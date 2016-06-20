'use strict';

import MaxLogin, { InitialState } from 'maxlogin-react-native'
import NewsInitialState from './news'

export default {
  news: NewsInitialState,
  maxlogin: new InitialState(),
  newsContent: {
    // newsID: {
    //   isFetching: false,
    //   data: '',
    //   error: null
    // }
  },
  comments: {
    mine: {
      isFetching: false,
      items: [],
      error: null
    },
    news: {
      // newsID: {
      //   isFetching: false,
      //   items: [],
      //   error: null
      // }
    }
  },
  favorite: {
    isAdding: false,
    addError: null,
    isFetching: false,
    fetchError: null,
    collections: []
  }
}
