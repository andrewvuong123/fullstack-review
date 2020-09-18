const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const git = require('../helpers/github.js');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


// Takes github username provided, gets repo info from github API, saves repo info into database
// make this an async fcn
app.post('/repos', async function (req, res) {
  // get username query from browser request
  var user = req.body.user;
  // await suspends progress until promise is resolved, helper fcn returns Promise, resolves with information from api
  var repos = await git.getReposByUsername(user);
  // get data from object returned by API
  repos = repos.data;
  // save into db
  db.save(repos);
  // send status
  res.status(201).send("Database Updated!");
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

