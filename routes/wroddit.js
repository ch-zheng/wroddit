//wroddit.js
'use strict';

//Imports
const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
	//FIXME: Testing handlebar partials
	res.render('wroddit', {posts: [
		{title: 'Post #1', author: 'Charlie'},
		{title: 'Post #2', author: 'Ethan'},
		{title: 'Post #3', author: 'Hang'}
	]})
);

module.exports = router;
