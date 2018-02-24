const User = require('./schemas/user.js');
const Comment = require('./schemas/comment.js');
const Post = require('./schemas/post.js');
const argon2 = require('argon2');
const mongoose = require('mongoose');
const mongodb = 'mongodb://crack:crack@ds243728.mlab.com:43728/wroddit';
mongoose.connect(mongodb);
const db = mongoose.connection;
mongoose.connection.on('err', () => console.log('error'));

let users = [];
let posts = [];
let comments = [];

async function createUser(username, passwd) {
    user = {
        username: username,
        hash: await argon2.hash(passwd),
    };

    const newUser = new User(user);
    await newUser.save();
    console.log(`New User: ${user.username} with hash: ${user.hash}`);
    users.push(newUser);
}

async function createPost(title, content, user, kind = 'text') {
    textPost = {
        title: title,
        content: content,
        user: user,
        kind: kind,
    }

    const newPost = new Post(textPost);
    await newPost.save();
    console.log(`New Post: ${textPost.title}`);
    posts.push(newPost);
}

createUser('hang', 'f')
    .then(_ => createUser('charlie', 'f'))
    .then(_ => createUser('ethan', 'f'))
    .then(_ => createUser('Vladimir Vodkov', 'f'))
    .then(_ => createUser('Natasha Nizamutdinova', 'f'))
    .then(_ => createUser('Dmitri Dmitrijev', 'f'))
    .then(_ => createUser('Boris Blokov', 'f'))
    .then(_ => createUser('Crowley', 'password'))
    .then(_ => createUser('Boylan', 'proveit'))
    .then(_ => createPost('filler', 'filler', users[0]._id))
    .then(_ => createPost('filler', 'filler', users[1]._id));


