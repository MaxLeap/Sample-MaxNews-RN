'use strict';

import ActionTypes from '../actionTypes';
const {
  CONTENT_REQUEST_START,
  CONTENT_REQUEST_SUCCESS,
  CONTENT_REQUEST_FAILURE
} = ActionTypes

function requestStart(nid) {
  return {
    type: CONTENT_REQUEST_START,
    nid
  }
}

function requestSuccess(nid, result) {
  return {
    type: CONTENT_REQUEST_SUCCESS,
    data: result,
    nid
  }
}

function requestFailure(nid, error) {
  return {
    type: CONTENT_REQUEST_FAILURE,
    data: error,
    nid
  }
}

function replaceRange(s, start, end, substitute) {
  return s.substring(0, start) + substitute + s.substring(end);
}

async function filteHtml(html) {
  if (!html) {
    return
  }
  let pattens = [
    ['<div sax-type="sax_5"', '</div>'],
    ['<nav class="sinaHead"', '</nav>'],
    ['<aside>', '</aside>'],
    ['<section class="art_share_btn">', '</body>']
  ]
  for (let p of pattens) {
    while (true) {
      let si = html.indexOf(p[0])
      if (si === -1) {
        break
      }
      let ei = html.indexOf(p[1], si)
      let end = ei+p[1].length
      let substitute = p[1] === '</body>' ? '</body>' : ''
      html = replaceRange(html, si, end, substitute)
    }
  }
  return html
}

export function fetchContent(item) {
  return dispatch => {
    dispatch(requestStart(item.id))

    fetch(item.get('contentLink'))
    .then(response => response.text())
    .then(html => filteHtml(html))
    .then(pureHtml => {
      dispatch(requestSuccess(item.id, pureHtml))
    })
    .catch(err => {
      dispatch(requestFailure(err))
      console.log(err);
    })
  }
}
