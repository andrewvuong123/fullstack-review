const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParse: true});

// set up db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo database connected');
})

// define structure, (fields)
let repoSchema = mongoose.Schema({
  _id: {type: Number, unique: true},
  repoName: String,
  username: String,
  userUrl: String,
  repoUrl: String,
  description: String,
  updated: String,
  forks: Number
});

// model === mongodb collection, this creates the collection
let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // store all docs into records
  var records = []
  // iterate through each repo object
  for (let i = 0; i < repos.length; i++) {
    // create an instance of the model with relevant data needed
    let repo = repos[i];
    let data = {
      _id: repo.id,
      repoName: repo.name,
      username: repo.owner.login,
      repoUrl: repo.html_url,
      userUrl: repo.owner.html_url,
      description: repo.description,
      updated: repo.updated_at,
      forks: repo.forks
    };
    // save data to records array
    records.push(data);
  }
  // save all records into database (avoid dup)
  Repo.insertMany(
    records,
    // execution won't stop when trying to insert a record with same unique index, will skip over and insert rest
    { ordered: false }
  )
}

module.exports.Repo = Repo;
module.exports.save = save;