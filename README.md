# angular-node-restful-api
A simple CRUD app example with pagination and search based on MySQL, Express, AngularJS and NodeJS.

## Demo
[Here is a working demo on Heroku](http://angular-node-pagination.herokuapp.com/posts)

## Installation
Please clone or download this to your machine then hit :

	npm install


## Configuration
#### 1. Create Database :

	CREATE DATABASE IF NOT EXISTS nodejs DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
	USE nodejs;

#### 2. Create Table :

    CREATE TABLE IF NOT EXISTS posts (
      id int(10) UNSIGNED NOT NULL,
      title varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
      description longtext COLLATE utf8_unicode_ci,
      created datetime DEFAULT NULL,
      modified datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#### 3. Update the /config/database.js

	host: 'localhost',
	database:'nodejs',
	user: 'type your db username',
	password: 'type your db password'
