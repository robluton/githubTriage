import React, { useEffect, useState } from 'react';
import './App.css';
import { getAppStatus, getIssues, getRepos } from './reducers/';
import { fetchIssues, fetchRepos } from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function App(props) {

  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    props.fetchRepos();
  }, []);

  useEffect(() => {
    if (selectedRepo) {
      props.fetchIssues(selectedRepo);
    }
  }, [selectedRepo]);

  return (
    <div className="app">
      <div className="page-title">
        <h2 className="font-serif">GITHUB ISSUES</h2>
      </div>
      <div className="main">
        <div className="col-4">
          <div className="sidebar">
            {props.repos.map(repo => (<div className="repo-item" onClick={() => setSelectedRepo(repo.name)}>{repo.name}</div>))}
          </div>
        </div>
        <div className="col-8">
          <div className="main-content">
            {props.issues.map(issue => (
              <div className="issue-item">
                <div className="flex-row items-center">
                  {issue.assignee && issue.assignee.avatar_url ? (
                    <img className="rounded-full avatar" src={issue.assignee.avatar_url} alt="owner avatar" />
                  ) : <div className="rounded-full avatar" style={{ background: '#ccc' }}></div>}
                  <div className="flex-row flex-wrap items-center">
                    <div className="issue-title-text" style={{ marginBottom: '0.5rem' }}>{issue.title}</div>
                    <div className="col-12">
                      <span style={{ marginRight: '1rem' }} className="font-sans">created {issue.created_at}</span>
                      <span className="font-sans date-text">updated {issue.updated_at}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    repos: getRepos(state),
    issues: getIssues(state),
    appStatus: getAppStatus(state),
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRepos,
      fetchIssues,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
