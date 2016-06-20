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

import ML from 'maxleap-react-native';

/**
 * Comment a news
 */
function commentStart(nid) {
  return {
    type: COMMENT_REQUEST_START,
    nid
  }
}

function commentSuccess(nid) {
  return {
    type: COMMENT_REQUEST_SUCCESS,
    nid
  }
}

function commentFailure(nid, error) {
  return {
    type: COMMENT_REQUEST_FAILURE,
    nid,
    error
  }
}

export function createComment({user, news, text, onSuccess, onFailure}) {
  return dispatch => {
    if (!text) {
      return
    }
    dispatch(commentStart(news.id))

    let Comment = ML.Object.extend('Comment')
    let cmt = new Comment()
    cmt.set('commentContent', text)

    let userPointer = ML.Object.createWithoutData(user.className, user.id)
    cmt.set('fromUser', userPointer)
    cmt.set('fromUserId', user.id)

    let newsPointer = ML.Object.createWithoutData(news.className, news.id)
    cmt.set('commentedNews', newsPointer)
    cmt.set('belongNewsID', news.id)

    cmt.save().then(() => {
      dispatch(commentSuccess(news.id))
      if (onSuccess) {
        onSuccess()
      }
    }).catch(err => {
      dispatch(commentFailure(news.id, error))
      if (onFailure) {
        onFailure(err)
      }
    })
  }
}

/**
 * Fetch comments for a news
 */
function fetchCommentsStart(nid) {
  return {
    type: GET_COMMENTS_REQUEST_START,
    nid
  }
}

function fetchCommentsSuccess(nid, result) {
  return {
    type: GET_COMMENTS_REQUEST_SUCCESS,
    nid,
    result
  }
}

function fetchCommentsFailure(nid, error) {
  return {
    type: GET_COMMENTS_REQUEST_FAILURE,
    nid,
    error
  }
}

export function fetchCommentsOfNews(news) {
  return dispatch => {
    dispatch(fetchCommentsStart(news.id))

    let Comment = ML.Object.extend('Comment')
    let query = new ML.Query(Comment)
    query.equalTo('belongNewsID', news.id)
    query.include(['fromUser'])
    query.descending('createdAt')
    query.find().then(items => {
      dispatch(fetchCommentsSuccess(news.id, items))
    }).catch(err => {
      dispatch(fetchCommentsFailure(news.id, err))
    })
  }
}

/**
 * Get all comments created by crrent user
 */
function fetchMyCommentsStart() {
  return {
    type: MY_COMMENTS_REQUEST_START
  }
}

function fetchMyCommentsSuccess(result) {
  return {
    type: MY_COMMENTS_REQUEST_SUCCESS,
    result
  }
}

function fetchMyCommentsFailure(error) {
  return {
    type: MY_COMMENTS_REQUEST_FAILURE,
    error
  }
}

export function fetchMyComments(user) {
  return dispatch => {
    dispatch(fetchMyCommentsStart())

    let Comment = ML.Object.extend('Comment')
    let query = new ML.Query(Comment)
    query.equalTo('fromUserId', user.id)
    query.include(['commentedNews'])
    query.descending('createdAt')
    query.find().then(items => {
      dispatch(fetchMyCommentsSuccess(items))
    }).catch(err => {
      dispatch(fetchMyCommentsFailure(err))
    })
  }
}
