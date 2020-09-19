import React from 'react';

const RepoListEntry = (props) => {
  return (
    <div className="repo">
      <div className="top-border">
        <a className="reponame" target="_blank" href={props.repo.userUrl}>{props.repo.username}</a>
        <span className="slash"> / </span>
        <a className="repourl" target="_blank" href={props.repo.repoUrl}>{props.repo.repoName}</a>
      </div>
      <div className="bottom-border">
        <h3 className="username">Username: {props.repo.username}</h3>
        <p className="description">Description: {props.repo.description}</p>
      </div>
    </div>
  )
}

const RepoList = (props) => (
    <div>
      {props.repos.map(repo =>
        <RepoListEntry key={repo._id} repo={repo} />
      )}
    </div>
)


export default RepoList;