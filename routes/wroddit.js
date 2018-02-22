'use strict';

const mongoose = require('mongoose');
const TextPost = require('../schemas/textpost.js');
const User = require('../schemas/user.js');
const express = require('express');
const router = express.Router();
//TODO: LITERALLY ANY ERROR HANDLING AT ALL
router.get('/', async (req, res) => {
    let posts = await getAllPosts();
    res.render('wroddit', {posts: posts})
});

async function getAllPosts() {
    let queryResult = await TextPost.find({}).populate('user', User);
    return queryResult.map(res => {
        return { title: res.title, author: res.user.username }
    });
}

module.exports = router;
