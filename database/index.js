const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParse: true});

// set up db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected');
})

let repoSchema = mongoose.Schema({
  _id: Number,
  reponame: String,
  username: String,
  url: String,
  description: String,
  updated: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.Repo = Repo;
module.exports.save = save;