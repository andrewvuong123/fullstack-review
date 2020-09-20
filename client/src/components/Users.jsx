import React from 'react';

const Users = (props) => (
  <div className="user-list">
    <div className="user-list-title">
      Users
    </div>
    {props.users.map(user =>
      <p key={user.username} className="user-list-entry" onClick={() => {props.onUser(user.username)}}> @{user.username} <br></br></p>
    )}
  </div>
)


export default Users;
