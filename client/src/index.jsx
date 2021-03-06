import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Users from './components/Users.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      users: []
    }
    this.handleUser = this.handleUser.bind(this);
  }

  // sends ajax req to server with username query
  search (term) {
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: {user: term},
      success: results => {
        console.log("Success");
        // update after entering into form
        this.update();
      }
    });
  }

  // update fcn sends get req to top 25 and users
  update () {
    $.ajax({
      method: 'GET',
      url: '/repos',
      success: results => {
        this.setState({
          repos: results
        });
      }
    });
    $.ajax({
      method: 'GET',
      url: '/users',
      success: results => {
        this.setState({
          users: results
        });
      }
    });
  }

  // handleUser gets that users top 10 repos
  handleUser (username) {
    $.ajax({
      method:'GET',
      url: '/repos',
      data: {user: username},
      success: results => {
        console.log('success', results);
        this.setState({
          repos: results
        });
      }
    });
    // change html text
    document.getElementById('header-2').innerHTML = `Top 10 repositories for @${username}`
  }

  // sends ajax req to get an arr of repos from database once component has loaded to DOM
  componentDidMount() {
    this.update();
  }

  render () {
    return (
    <div>
      <header className="header">
        <h1 className="title" onClick={() => window.location.reload(false)}>Github Fetcher</h1>
        <Search onSearch={this.search.bind(this)} />
      </header>
      <div>
        <Users users={this.state.users} onUser={this.handleUser}/>
        <h2 id="header-2">Here are the top 25 repositories...</h2>
        <RepoList repos={this.state.repos} />
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));