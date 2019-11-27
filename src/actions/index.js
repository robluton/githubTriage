import axios from 'axios';

export const FETCH_REPOS = 'FETCH_REPOS';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_FAIL = 'FETCH_REPOS_FAIL';

export const FETCH_ISSUES = 'FETCH_ISSUES';
export const FETCH_ISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ISSUES_FAIL = 'FETCH_ISSUES_FAIL';

const API_BASE_URL = 'https://api.github.com';

// Action Creators
export function fetchRepos() {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_REPOS });
    try {
      const resp = await axios.get(`${API_BASE_URL}/user/repos/`, {
        auth: {
          username: process.env.GITHUB_USER,
          password: process.env.GITHUB_PASS,
        }
      });
      dispatch({ type: FETCH_REPOS_SUCCESS, data: resp.data });
    } catch(error) {
      dispatch({ type: FETCH_REPOS_FAIL, error });
    }
  }
}

export function fetchIssues() {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_ISSUES });
    try {
      const resp = await axios.get(`${API_BASE_URL}/user/issues/`, {
        auth: {
          username: process.env.GITHUB_USER,
          password: process.env.GITHUB_PASS,
        }
      });
      dispatch({ type: FETCH_ISSUES_SUCCESS, data: resp.data });
    } catch(error) {
      dispatch({ type: FETCH_ISSUES_FAIL, error });
    }
  }
}
