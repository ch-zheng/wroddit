'use strict';

const mongoose = require('mongoose');
const Post = require('../schemas/post.js');
const User = require('../schemas/user.js');
const express = require('express');
const router = express.Router();
//TODO: LITERALLY ANY ERROR HANDLING AT ALL
router.get('/', async (req, res) => {
    let posts = await getAllPosts();
    res.render('wroddit-browse', {posts: posts})
});
router.get('/comments', /*async*/ (req, res) =>
	//TODO: Retrieve specific post using HTTP request info
	res.render('wroddit-comments', {
		//Silly example
		post: {author: 'Man', title: 'Singular post'},
		comments: [{author: 'Small man', points: '69', content: 'u suck.'}]
	})
);

async function getAllPosts() {
    let queryResult = await Post.find({}).populate('user', User);
    return queryResult.map(res => {
        return { title: res.title, author: res.user.username, id: res._id }
    });
}

module.exports = router;
