//wroddit.js
'use strict';

//Imports
const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');

//Database
/*
const mongoDB = 'mongodb://127.0.0.1/charliezh';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(
	console, 'MongoDB connection error:'
));
*/

router.get('/', (req, res) =>
	//FIXME: Testing handlebar partials
	res.render('wroddit', {posts: [
		{title: 'Post #1', author: 'Charlie'},
		{title: 'Post #2', author: 'Ethan'},
		{title: 'Post #3', author: 'Hang'}
	]})
);

module.exports = router;
