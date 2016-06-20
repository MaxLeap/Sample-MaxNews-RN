'use strict';

import ActionTypes from '../actionTypes';
const {
  ACCCOUT_SET_CURRENT_USER,
  ACCCOUT_GET_LOCAL_CURRENT_USER_START
} = ActionTypes

import MaxLeap, { User } from 'maxleap-react-native';
import { setCurrentUser } from 'maxlogin-react-native'

function isAnonymous(user) {
  let authData = user.get('authData')
  let anonymous = authData && authData['anonymous']
  let aid = anonymous && anonymous['id']
  return aid !== undefined
}

export function getCurrentUserAsync() {
  return dispatch => {
    User.currentAsync()
    .then(user => {
      if (user && !isAnonymous(user)) {
        dispatch(setCurrentUser(user))
      }
    })
    .catch(err => {
      alert(err)
    })
  }
}

export function logout() {
  return dispatch => {
    User.logOut().then(() => {
      dispatch(setCurrentUser(null))
    })
  }
}

export function updateUser(params={}, onSuccess, onFailure) {
  return dispatch => {
    if (!params || params.length === 0) {
      return;
    }
    User.currentAsync()
    .then(user => {
      if (user && !isAnonymous(user)) {
        for (let key of Object.keys(params)) {
          let value = params[key]
          user.set(key, value)
        }
        user.save().then(value => {
          dispatch(setCurrentUser(user))
          if (onSuccess) {
            onSuccess()
          }
        }).catch(err => {
          alert(err)
        })
      }
    })
    .catch(err => {
      alert(err)
    })
  }
}
