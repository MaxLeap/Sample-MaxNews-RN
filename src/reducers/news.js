'use strict';

import ActionTypes from '../actionTypes';
const {
  NEWS_REFRESH_START,
  NEWS_REFRESH_SUCCESS,
  NEWS_REFRESH_FAILURE,

  NEWS_LOADMORE_START,
  NEWS_LOADMORE_SUCCESS,
  NEWS_LOADMORE_FAILURE,

  NEWS_CATEGORY_REQUEST_START,
  NEWS_CATEGORY_REQUEST_SUCCESS,
  NEWS_CATEGORY_REQUEST_FAILURE,

  NEWS_SELECT_CATEGORY
} = ActionTypes

import InitState from '../initialState';

function categories(state, action) {
  switch (action.type) {
    case NEWS_CATEGORY_REQUEST_SUCCESS: {
      return action.data
    }

    default:
      return state
  }
}

function items(state, action) {
  switch (action.type) {
    case NEWS_REFRESH_SUCCESS: {
      let nextState = {...state}
      nextState[action.cid] = action.data
      return nextState
    }

    case NEWS_LOADMORE_SUCCESS: {
      let items = state[action.cid]
      let nextItems = items.concat(action.data)
      let nextState = {...state}
      nextState[action.cid] = nextItems
      return nextState
    }

      break;
    default:
      return state
  }
}

export function news(state=InitState.news, action) {
  switch (action.type) {
    case NEWS_REFRESH_START:
    case NEWS_LOADMORE_START:
    case NEWS_CATEGORY_REQUEST_START: {
      return {
        ...state,
        categories: categories(state.categories, action),
        items: items(state.items, action),
        isFetching: true,
        error: null
      }
    }
    case NEWS_REFRESH_SUCCESS:
    case NEWS_LOADMORE_SUCCESS:
    case NEWS_CATEGORY_REQUEST_SUCCESS: {
      return {
        ...state,
        categories: categories(state.categories, action),
        items: items(state.items, action),
        isFetching: false
      }
    }
    case NEWS_REFRESH_FAILURE:
    case NEWS_LOADMORE_FAILURE:
    case NEWS_CATEGORY_REQUEST_FAILURE: {
      return {
        ...state,
        categories: categories(state.categories, action),
        items: items(state.items, action),
        isFetching: false,
        error: action.data
      }
    }

    case NEWS_SELECT_CATEGORY: {
      return {
        ...state,
        selectedCategory: action.data
      }
    }

    default:
      return state
  }
}
