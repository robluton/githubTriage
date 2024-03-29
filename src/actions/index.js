import axios from 'axios';
import { format, parseISO, formatRelative } from 'date-fns';
import _get from 'lodash/get';

export const FETCH_REPOS = 'FETCH_REPOS';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_FAIL = 'FETCH_REPOS_FAIL';

export const FETCH_ISSUES = 'FETCH_ISSUES';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAIL = 'FETCH_ISSUES_FAIL';

export const UPDATE_SORT_SETTINGS_SUCCESS = 'UPDATE_SORT_SETTINGS_SUCCESS';

const API_BASE_URL = 'https://api.github.com';
const USER = process.env.REACT_APP_GITHUB_USER;

export function updateSortSettings(settings) {
  return async (dispatch, getState) => {
    const currentSettings = getState().sortSettings;
    const updatedSettings = {
        ...currentSettings,
        ...settings,
      }
    localStorage.setItem('sortSettings', JSON.stringify(updatedSettings));
    return dispatch({
      type: UPDATE_SORT_SETTINGS_SUCCESS,
      data: updatedSettings,
    });
  };
}

export function fetchRepos() {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_REPOS });
    try {
      const resp = await axios.get(`${API_BASE_URL}/users/${USER}/repos`, {
        auth: {
          username: USER,
          password: process.env.REACT_APP_GITHUB_PASS,
        }
      });
      dispatch({ type: FETCH_REPOS_SUCCESS, data: resp.data });
    } catch(error) {
      dispatch({ type: FETCH_REPOS_FAIL, error });
    }
  }
}

export function fetchIssues(repo) {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_ISSUES });
    // https://api.github.com/repos/username/reponame/issues
    const url = repo
      ? `${API_BASE_URL}/repos/${USER}/${repo}/issues`
      : `${API_BASE_URL}${USER}/issues`;
    try {
      const resp = await axios.get(url, {
        auth: {
          username: process.env.GITHUB_USER,
          password: process.env.GITHUB_PASS,
        }
      });

      const data = resp.data.map(issue => {
        return (
          {
            title: issue.title,
            assignee: _get(issue, 'assignee', ''),
            assigneeAvatarURL: _get(issue, 'assignee.avatar_url', ''),
            updatedFormatted: formatRelative(parseISO(issue.updated_at), new Date()),
            createdFormatted: format(parseISO(issue.created_at), 'MM/dd/yyyy'),
            updated: issue.updated_at,
            created: issue.created_at,
          }
        );
      });

      dispatch({ type: FETCH_ISSUES_SUCCESS, data });
    } catch(error) {
      dispatch({ type: FETCH_ISSUES_FAIL, error });
    }
  }
}
