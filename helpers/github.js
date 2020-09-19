const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.GITHUBTOKEN || config.TOKEN}`
    }
  };
  // return a Promise object, resolves with data from github API if found
  return new Promise((resolve, reject) => {
    axios.get(options.url)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      })
  });
}

module.exports.getReposByUsername = getReposByUsername;