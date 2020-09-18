const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  axios.get(options.url, {
      params: {
        q: username
      }
    })
    .then(function (data) {
      console.log('Data received', data);
    })
    .catch(function (error) {
      console.log('Error:', error);
    });
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/search/repositories',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

}

module.exports.getReposByUsername = getReposByUsername;