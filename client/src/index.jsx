import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
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

  // update fcn sends get request to get top 25
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
  }

  // sends ajax req to get an arr of repos from database once component has loaded to DOM
  componentDidMount() {
    this.update();
  }

  render () {
    return (
    <div>
      <header className="header">
        <h1 className="title">Github Fetcher</h1>
        <Search onSearch={this.search.bind(this)}/>
      </header>
      <h2>Here are the top 25 repositories...</h2>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));