'use strict';

import ActionTypes from '../actionTypes';
const {
  CONTENT_REQUEST_START,
  CONTENT_REQUEST_SUCCESS,
  CONTENT_REQUEST_FAILURE
} = ActionTypes

import InitState from '../initialState';

export function newsContent(state=InitState.newsContent, action) {
  switch (action.type) {
    case CONTENT_REQUEST_START: {
      let nextState = {...state}
      nextState[action.nid] = {isFetching: true}
      return nextState
    }
    case CONTENT_REQUEST_SUCCESS: {
      let nextState = {...state}
      nextState[action.nid] = {
        ...state[action.nid],
        isFetching: false,
        data: action.data
      }
      return nextState
    }
    case CONTENT_REQUEST_FAILURE: {
      let nextState = {...state}
      nextState[action.nid] = {
        ...state[action.nid],
        isFetching: false,
        error: action.data
      }
      return nextState
    }

    default:
      return state
  }
}
