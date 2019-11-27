import { combineReducers } from 'redux';
import {
  FETCH_REPOS,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAIL,
  FETCH_ISSUES,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES_FAIL,
} from '../actions/';

function repos(state = [], action = {}) {
  switch (action.type) {
    case FETCH_REPOS_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

function issues(state = [], action = {}) {
  switch (action.type) {
    case FETCH_ISSUES_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

const loadingStatuses = {
  [FETCH_REPOS]: 'loading',
  [FETCH_REPOS_SUCCESS]: 'done',
  [FETCH_REPOS_FAIL]: 'error',
  [FETCH_ISSUES]: 'loading',
  [FETCH_ISSUES_SUCCESS]: 'done',
  [FETCH_ISSUES_FAIL]: 'error',
}

function appStatus(state = '', action = {}) {
  return loadingStatuses[action.type] || '';
}

export default combineReducers({
  repos,
  issues,
  appStatus,
});

/**
 * Selectors
 */
export function getRepos(state) {
  return state.repos;
}

export function getIssues(state) {
  return state.issues;
}

export function getAppStatus(state) {
  return state.appStatus;
}


