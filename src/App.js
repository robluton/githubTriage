import React, { useEffect, useState } from "react";
import "./App.css";
import { getAppStatus, getIssues, getRepos, getSortSettings } from "./reducers/";
import { fetchIssues, fetchRepos, updateSortSettings } from "./actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function App(props) {
  const { sortField, sortDirection } = props.sortSettings;
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    props.fetchRepos();
  }, []);

  useEffect(() => {
    if (selectedRepo) {
      props.fetchIssues(selectedRepo);
    }
  }, [selectedRepo]);

  function handleSortChange(value, field) {
    props.updateSortSettings({ [field]: value });
  }

  return (
    <div className="app">
      <div className="page-title">
        <h2 className="font-serif">GITHUB ISSUES</h2>
      </div>
      <div className="main">
        <div className="col-4">
          <div className="sidebar">
            {props.repos.map(repo => {
              const cssClasses = selectedRepo === repo.name
                ? 'repo-item repo-item_selected'
                : 'repo-item';
              return (
              <div
                className={cssClasses}
                onClick={() => setSelectedRepo(repo.name)}
              >
                {repo.name}
              </div>
            )
            })}
          </div>
        </div>
        <div className="col-8">
          <div className="main-content">
            <div style={{ marginBottom: '1rem' }}>
              <select
                style={{ marginRight: '0.5rem' }}
                value={sortField}
                onChange={(e) => handleSortChange(e.target.value, 'sortField')
              }>
                <option value="title">Title</option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
              </select>
              <select
                style={{ marginRight: '0.5rem' }}
                value={sortDirection}
                onChange={(e) => handleSortChange(e.target.value, 'sortDirection')}
              >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </div>
            {props.issues.map(issue => (
              <div className="issue-item">
                <div className="flex-row items-center">
                  {issue.assigneeAvatarURL ? (
                    <img
                      className="rounded-full avatar"
                      src={issue.assigneeAvatarURL}
                      alt="owner avatar"
                    />
                  ) : (
                    <div
                      className="rounded-full avatar"
                      style={{ background: "#ccc" }}
                    ></div>
                  )}
                  <div className="flex-row flex-wrap items-center">
                    <div
                      className="issue-title-text"
                      style={{ marginBottom: "0.5rem" }}
                    >
                      {issue.title}
                    </div>
                    <div className="col-12">
                      <span
                        style={{ marginRight: "1rem" }}
                        className="font-sans date-text"
                      >
                        created
                        <span>{issue.createdFormatted}</span>
                      </span>
                      <span className="font-sans date-text">
                        updated <span>{issue.updatedFormatted}</span>
                      </span>
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

const mapStateToProps = state => {
  return {
    repos: getRepos(state),
    issues: getIssues(state),
    appStatus: getAppStatus(state),
    sortSettings: getSortSettings(state),
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRepos,
      fetchIssues,
      updateSortSettings,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
