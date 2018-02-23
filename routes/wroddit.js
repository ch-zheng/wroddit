'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Post = require('../schemas/post.js');
const User = require('../schemas/user.js');
const express = require('express');
const router = express.Router();
//TODO: LITERALLY ANY ERROR HANDLING AT ALL
router.get('/', async (req, res, next) => {
    try {
        let posts = await Post.find({}).populate('user', User);
        posts = posts.map(res => {
            return { title: res.title, author: res.user.username, id: res._id }
        })
        res.render('wroddit-browse', {posts: posts})
    } catch(e) {
        next(e)
    }
});

router.get('/comments/:id', async (req, res, next) => {
    try {
        let post = await Post.findById(new ObjectId(req.params.id)).populate('user', User);
        res.render('wroddit-comments', {
            post: {author: post.user.username , title: post.title },
            //TODO: make it serve the actual comments
            comments: [{author: 'Small man', points: '69', content: 'u suck.'}]
        })
    } catch(e) {
        next(e)
    }
});

router.get('/submit', /*async*/ (req, res) => {
    res.render('wroddit-submit');
});

module.exports = router;
