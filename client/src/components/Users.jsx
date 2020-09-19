import React from 'react';

const Users = (props) => (
  <div className="user-list">
    <div className="user-list-title">
      Users
    </div>
    {props.users.map(user =>
      <a className="user-list-entry" target="_blank" href={`https://github.com/${user}`}> @{user} <br></br></a>
    )}
  </div>
)


export default Users;
