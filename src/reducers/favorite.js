'use strict';

import ActionTypes from '../actionTypes';
const {
  ADD_TO_FAVORITES_START,
  ADD_TO_FAVORITES_SUCCESS,
  ADD_TO_FAVORITES_FAILURE,

  GET_MYFAVORITES_REQUEST_START,
  GET_MYFAVORITES_REQUEST_SUCCESS,
  GET_MYFAVORITES_REQUEST_FAILURE
} = ActionTypes

import InitState from '../initialState';

export function favorite(state=InitState.favorite, action) {
  switch (action.type) {
    case ADD_TO_FAVORITES_START: {
      return {
        ...state,
        isAdding: true,
        addError: null
      }
    }
    case ADD_TO_FAVORITES_SUCCESS: {
      return {
        ...state,
        isAdding: false
      }
    }
    case ADD_TO_FAVORITES_FAILURE: {
      return {
        ...state,
        isAdding: false,
        addError: action.error
      }
    }

    case GET_MYFAVORITES_REQUEST_START: {
      return {
        ...state,
        isFetching: true,
        fetchError: null
      }
    }
    case GET_MYFAVORITES_REQUEST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        collections: action.result || []
      }
    }
    case GET_MYFAVORITES_REQUEST_FAILURE: {
      return {
        ...state,
        isFetching: false,
        fetchError: action.error
      }
    }

    default:
      return state
  }
}
