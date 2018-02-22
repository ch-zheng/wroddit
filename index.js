//index.js
'use strict';

//Imports
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 
const Post = require('./schemas/post.js');

mongoose.connect('mongodb://crack:crack@ds243728.mlab.com:43728/wroddit');


const db = mongoose.connection;
mongoose.promise = global.Promise;
db.on('error', () => console.log("failure"));
db.once('open', () => {
    console.log('succesfully established a connection to mongodb');
})

const wrodditRouter = require('./routes/wroddit.js')
const server = express();

//Template engine (hbs)
hbs.registerPartials(path.join(__dirname + '/views/partials'));

//Express settings
server.set('view engine', 'hbs');
server.use(express.static(path.join(__dirname, 'public')));

//Express routing
server.get('/', (req, res) => res.redirect('/w/frankenstein'));
server.use('/w/frankenstein', wrodditRouter);
server.post('/api/upvote/:postId', (req, res) => upvotePost(req.params.postId));
server.post('/api/downvote/:postId', (req, res) => downvotePost(req.params.postId));
server.listen(3000, () => console.log('Listening on port 3000'));

async function upvotePost(id) {
    console.log('upvoting post');
    let res = await Post.findByIdAndUpdate(new ObjectId(id), {$inc: {score: 1}}); 
    return res;
}

async function downvotePost(id) {
    console.log('downvoting post');
    return await Post.findByIdAndUpdate(new ObjectId(id), {$inc: {score: -1}});
}
