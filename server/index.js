const express = require('express');
const bodyParser = require('body-parser');
// const mongoDB = require('../database/index.js');
const mysqlDB = require('../database/mysql.js');
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
  // save into MONGO DB
  // mongoDB.save(repos);
  // save into mySQL DB
  mysqlDB.save(repos);
  // send status
  res.status(201).send("Database Updated!");
});

// This route should send back the top 25 repos
app.get('/repos', async function (req, res) {
  var results;
  // get username query from browser request
  var user = req.query.user;
  console.log('user', user);
  if (user === undefined) {
    // MONGO DB IMPLEMENTATION
    // query into database, get the top 25 repos if no user specified
    // await mongoDB.Repo.find().sort({ forks: -1, created_at: -1 }).limit(25).exec((err, data) => {
    //   if (err) {
    //     console.log('error');
    //   } else {
    //     results = data;
    //   }
    // });

    // SQL DB IMPLEMENTATION
    var sql = `SELECT * FROM Repo ORDER BY updated, forks DESC`;
    mysqlDB.query(sql, (err, data) => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('top 25', data);
        results = data;
      }
    });

  } else { // if user specified, return top 10 repos from that user

    // MONGO DB IMPLEMENTATION
    // await mongoDB.Repo.find({username: user}).sort({ forks: -1, created_at: -1 }).limit(10).exec((err, data) => {
    //   if (err) {
    //     console.log('error');
    //   } else {
    //     results = data;
    //   }
    // });

    // SQL DB IMPLEMENTATION
    var sql = `SELECT * FROM Repo WHERE username = '${user}' ORDER BY updated, forks DESC`
    mysqlDB.query(sql, (err, data) => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('user specific', data);
        results = data;
      }
    });
  }
  // send results from query once resolved
  res.status(200).send(results);
});

// get request to get all users from db
app.get('/users', async function (req, res) {
  var results;
  // MONGO DB IMPLEMENTATION
  // query into database and get all users
  // await mongoDB.Repo.distinct('username', (err, data) => {
  //   if (err) {
  //     console.log('error');
  //   } else {
  //     results = data;
  //   }
  // });

  // SQL DB IMPLEMENTATION
  var sql = `SELECT DISTINCT username FROM Repo`
  mysqlDB.query(sql, (err, data) => {
    if (err) {
      console.log('error', err);
    } else {
      console.log('users', data);
      results = data;
    }
  })
  res.status(200).send(results);
});

let port = process.env.PORT;
if (port === undefined || port === "") {
  port = 1128;
}

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

