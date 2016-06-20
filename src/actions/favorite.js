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

import ML from 'maxleap-react-native';

function addStart() {
  return {
    type: ADD_TO_FAVORITES_START
  }
}

function addSuccess() {
  return {
    type: ADD_TO_FAVORITES_SUCCESS
  }
}

function addFailure(error) {
  return {
    type: ADD_TO_FAVORITES_FAILURE,
    error
  }
}

export function addToFavorite({user, news, onSuccess, onFailure}) {
  return dispatch => {
    dispatch(addStart())

    let newsPointer = ML.Object.createWithoutData(news.className, news.id)

    let UserCollection = ML.Object.extend('UserCollection')
    let collection = new UserCollection()
    collection.set('collectedNews', newsPointer)
    collection.set('collectedByUserID', user.id)

    collection.save().then(() => {
      dispatch(addSuccess())
      if (onSuccess) {
        onSuccess()
      }
    }).catch(err => {
      dispatch(addFailure(err))
      if (onFailure) {
        onFailure(err)
      }
    })
  }
}

function fetchStart() {
  return {
    type: GET_MYFAVORITES_REQUEST_START
  }
}

function fetchSuccess(result) {
  return {
    type: GET_MYFAVORITES_REQUEST_SUCCESS,
    result
  }
}

function fetchFailure(error) {
  return {
    type: GET_MYFAVORITES_REQUEST_FAILURE,
    error
  }
}

export function fetchFavorites({user, onSuccess, onFailure}) {
  return dispatch => {
    dispatch(fetchStart())

    let UserCollection = ML.Object.extend('UserCollection')
    let query = new ML.Query(UserCollection)
    query.equalTo('collectedByUserID', user.id)
    query.include('collectedNews')

    query.find().then(items => {
      dispatch(fetchSuccess(items))
      if (onSuccess) {
        onSuccess()
      }
    }).catch(err => {
      dispatch(fetchFailure(err))
      if (onFailure) {
        onFailure(err)
      }
    })
  }
}
