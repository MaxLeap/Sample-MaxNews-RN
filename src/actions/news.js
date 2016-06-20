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

import MaxLeap, {
  Query
} from 'maxleap-react-native';

function refreshStart() {
  return {
    type: NEWS_REFRESH_START
  }
}

function refreshSuccess(cid, result) {
  return {
    type: NEWS_REFRESH_SUCCESS,
    data: result,
    cid
  }
}

function refreshFailure(error) {
  return {
    type: NEWS_REFRESH_FAILURE,
    data: error
  }
}

function fetchNews(cid='', page=0, pageCount=-1) {
  let News = ML.Object.extend('News');
  let q = new Query(News)
  return q.equalTo('belongCategoryID', cid)
  .skip(page*pageCount)
  .limit(pageCount)
  .find()
}

export function refresh(cid) {
  return dispatch => {
    dispatch(refreshStart())
    fetchNews(cid)
    .then(value => {
      dispatch(refreshSuccess(cid, value))
    }).catch(err => {
      dispatch(refreshFailure(err))
    })
  }
}

function loadmoreStart() {
  return {
    type: NEWS_LOADMORE_START
  }
}

function loadmoreSuccess(cid, result) {
  return {
    type: NEWS_LOADMORE_SUCCESS,
    data: result,
    cid
  }
}

function loadmoreFailure(error) {
  return {
    type: NEWS_LOADMORE_FAILURE,
    data: error
  }
}

export function loadmore(cid, page, pageCount) {
  return dispatch => {
    dispatch(loadmoreStart())
    fetchNews(cid)
    .then(value => {
      dispatch(loadmoreSuccess(cid, value))
    }).catch(err => {
      dispatch(loadmoreFailure(err))
    })
  }
}


function fetchCategoriesStart() {
  return {
    type: NEWS_CATEGORY_REQUEST_START
  }
}

function fetchCategoriesSuccess(result) {
  return {
    type: NEWS_CATEGORY_REQUEST_SUCCESS,
    data: result
  }
}

function fetchCategoriesFailure(error) {
  return {
    type: NEWS_CATEGORY_REQUEST_FAILURE,
    data: error
  }
}

export function fetchCategories(onSuccess, onFailure) {
  return dispatch => {
    dispatch(fetchCategoriesStart())
    let Category = ML.Object.extend('Category');
    let q = new Query(Category)
    q.find()
    .then(value => {
      dispatch(fetchCategoriesSuccess(value))
      if (onSuccess) {
        onSuccess(value)
      }
    }).catch(err => {
      dispatch(fetchCategoriesFailure(err))
      if (onFailure) {
        onFailure(err)
      }
    })
  }
}

export function selectCategory(cid) {
  return {
    type: NEWS_SELECT_CATEGORY,
    data: cid
  }
}
