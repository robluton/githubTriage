import _orderBy from 'lodash/orderBy';

import { combineReducers } from 'redux';
import {
  FETCH_REPOS,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAIL,
  FETCH_ISSUES,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES_FAIL,
  UPDATE_SORT_SETTINGS_SUCCESS,
} from '../actions/';


const defaultSortSettings = {
  sortField: 'created',
  sortDirection: 'asc',
};

function getInitialSortSettings() {
  const storedSettings = localStorage.getItem('sortSettings');
  const settings = storedSettings
    ? {...defaultSortSettings, ...JSON.parse(storedSettings)}
    : {...defaultSortSettings};

  return settings;
}

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

const initialSortSettings = getInitialSortSettings();
function sortSettings(state = initialSortSettings, action = {}) {
  switch (action.type) {
    case UPDATE_SORT_SETTINGS_SUCCESS: {
      return {
        ...state,
        ...action.data
      };
    }
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
  sortSettings,
});

/**
 * Selectors
 */
export function getRepos(state) {
  return state.repos;
}

export function getIssues(state) {
  const { sortField, sortDirection } = state.sortSettings;

  const sorted = _orderBy(state.issues, sortField, sortDirection);
  return sorted;
}

export function getAppStatus(state) {
  return state.appStatus;
}

export function getSortSettings(state) {
  return state.sortSettings;
}
