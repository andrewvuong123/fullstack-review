const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const git = require('../helpers/github.js');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


// This route should get repo info from github API according to the username given, saves repo info into database
// Async fcn
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

// This route should send back the top 25 repos
app.get('/repos', async function (req, res) {
  var results;
  // query into database, get the top 25 repos with most forks/recent update
  await db.Repo.find().sort({ forks: -1, created_at: -1 }).limit(25).exec((err, data) => {
    if (err) {
      console.log('error');
    } else {
      results = data;
    }
  });
  // send results from query once resolved
  res.status(200).send(results);
});

// get request to get all users from db
app.get('/users', async function (req, res) {
  var results;
  // query into database and get all users
  await db.Repo.distinct('username', (err, data) => {
    if (err) {
      console.log('error');
    } else {
      results = data;
    }
  });
  res.status(200).send(results);
});

let port = process.env.PORT;
if (port === undefined || port === "") {
  port = 1128;
}

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

