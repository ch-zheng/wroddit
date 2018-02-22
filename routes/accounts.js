
const mongoose = require('mongoose');
const User = require('../schemas/user.js');
const express = require('express');
const router = express.Router();

//TODO: LITERALLY ANY ERROR HANDLING AT ALL
router.get('/', async (req, res) => {
    let posts = await getAllPosts();
    res.render('wroddit', {posts: posts})
});

module.exports = router;
