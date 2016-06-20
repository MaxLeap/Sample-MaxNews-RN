'use strict';

import ActionTypes from '../actionTypes';
const {
  COMMENT_REQUEST_START,
  COMMENT_REQUEST_SUCCESS,
  COMMENT_REQUEST_FAILURE,

  GET_COMMENTS_REQUEST_START,
  GET_COMMENTS_REQUEST_SUCCESS,
  GET_COMMENTS_REQUEST_FAILURE,

  MY_COMMENTS_REQUEST_START,
  MY_COMMENTS_REQUEST_SUCCESS,
  MY_COMMENTS_REQUEST_FAILURE
} = ActionTypes

import InitState from '../initialState';

function mine(state, action) {
  switch (action.type) {
    case MY_COMMENTS_REQUEST_START: {
      return {
        ...state,
        isFetching: true,
        error: null
      }
    }

    case MY_COMMENTS_REQUEST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        items: action.result
      }
    }

    case MY_COMMENTS_REQUEST_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    }

    default:
      return state
  }
}

function news(state, action) {
  switch (action.type) {
    case GET_COMMENTS_REQUEST_START: {
      let content = {...state[action.nid]}
      content.isFetching = true
      content.error = null

      let nextState = {...state}
      nextState[action.nid] = content
      return nextState
    }
    case GET_COMMENTS_REQUEST_SUCCESS: {
      let content = {...state[action.nid]}
      content.isFetching = false
      content.items = action.result

      let nextState = {...state}
      nextState[action.nid] = content
      return nextState
    }
    case GET_COMMENTS_REQUEST_FAILURE: {
      let content = {...state[action.nid]}
      content.isFetching = false
      content.error = action.error

      let nextState = {...state}
      nextState[action.nid] = content
      return nextState
    }

    default:
      return state
  }
}

export function comments(state=InitState.comments, action) {
  return {
    mine: mine(state.mine, action),
    news: news(state.news, action)
  }
}
