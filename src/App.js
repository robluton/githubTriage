import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAppStatus, getIssues, getRepos } from './reducers/';
import { fetchIssues, fetchRepos } from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function App(props) {

  useEffect(() => {
    // props.fetchRepos();
  })

  console.log(props);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
