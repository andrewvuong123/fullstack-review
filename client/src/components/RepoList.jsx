import React from 'react';

const RepoListEntry = (props) => {
  return (
    <div className="repo">
      <h3>{props.repo.username}</h3>
      <a target="_blank" href={props.repo.url}>{props.repo.reponame}</a>
      <p>{props.repo.description}</p>
    </div>
  )
}

const RepoList = (props) => (
    <div>
      <h4> Repo List Component </h4>
      {props.repos.map(repo =>
        <RepoListEntry key={repo._id} repo={repo} />
      )}
    </div>
)


export default RepoList;