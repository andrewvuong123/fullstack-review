const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fetcher'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting');
    return;
  }
  console.log('connected to mysql database');
});

// This function should save a repo or repos to the mysql DB
let save = (repos) => {
  // iterate through each repo object
  for (let i = 0; i < repos.length; i++) {
    // create an instance of the model with relevant data needed
    let repo = repos[i];
    let data = [
      repo.id,
      repo.name,
      repo.owner.login,
      repo.html_url,
      repo.owner.html_url,
      repo.description,
      repo.updated_at,
      repo.forks
    ];
    // save record into database
    var sql = "INSERT INTO Repo ( _id, repoName, username, userUrl, repoUrl, description, updated, forks ) VALUE ( ?, ?, ?, ?, ?, ?, ?, ? )";
    // pass in sql query, params, and callback
    db.query(sql, (data), (err, result) => {
      if (err) {
        console.log('error inserting', err)
      }
    });
  }
}

module.exports = db;
module.exports.save = save