-- Create database, Drop if one exists already
DROP DATABASE fetcher;
CREATE DATABASE fetcher;

-- select database
USE fetcher;

-- create tables
CREATE TABLE Repo
(
  _id INT,
  repoName VARCHAR(150),
  username VARCHAR(150),
  userUrl VARCHAR(150),
  repoUrl VARCHAR(150),
  description VARCHAR(150),
  updated VARCHAR(150),
  forks INT,
  PRIMARY KEY (_id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < database/schema.sql
 *  to create the database and the tables.*/
