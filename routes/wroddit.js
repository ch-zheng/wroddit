'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Post = require('../schemas/post.js');
const User = require('../schemas/user.js');
const Comment = require('../schemas/comment.js');
const express = require('express');
const router = express.Router();
const passport = require('passport');
//TODO: LITERALLY ANY ERROR HANDLING AT ALL
router.get('/', async (req, res, next) => {
    try {
        let posts = await Post.find({}).populate('user', User).sort({ score: -1 });
        posts = posts.map(res => {
            return { title: res.title, author: res.user.username, id: res._id, score: res.score}
        })
        res.render('wroddit-browse', {posts: posts})
    } catch(e) {
        next(e)
    }
});

router.get('/comments/:id', async (req, res, next) => {
    try {
        let post = await Post.findById(new ObjectId(req.params.id))
            .populate('user', User)
            .populate({
                path: 'root_comments',
                model: Comment,
                populate: {
                    path: 'user',
                    model: User,
                }
            }).sort('score')
        let rootComments = post.root_comments;

        rootComments = rootComments
            .map((com, i) => {
                return { author: com.user.username,
                         points: com.score,
                         content: com.content 
                       };
            });
        res.render('wroddit-comments', {
            post: { author: post.user.username,
                    title: post.title, 
                    content: post.content, 
                    id: post._id },
            comments: rootComments,
        })
    } catch(e) {
        next(e)
    }
});

router.get('/submit', (req, res) => {
    res.render('wroddit-submit');
});

router.post('/submit/text', async (req, res, next) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.redirect('/');
        }
        let post = {
            title: req.body.title,
            content: req.body.text,
            kind: 'text',
            user: user._id,
        }
        let newPost = new Post(post);
        await newPost.save();
        res.redirect('/');
    } catch(e) {
        next(e)
    }
});

router.post('/comments/:id/submit', async (req, res, next) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.redirect('/');
        }
        let comment = {
            content: req.body.comment,
            user: user,
        };
        let newComment = new Comment(comment);
        await newComment.save();
        await Post.findByIdAndUpdate(req.params.id, { $push: { root_comments: newComment._id }});
        res.redirect(`/w/frankenstein/comments/${req.params.id}`);
    } catch(e) {
        next(e)
    }
})

module.exports = router;
