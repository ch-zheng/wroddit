const User = require('./schemas/user.js');
const Comment = require('./schemas/comment.js');
const Post = require('./schemas/post.js');

const mongoose = require('mongoose');
const mongodb = 'mongodb://crack:crack@ds243728.mlab.com:43728/wroddit';
mongoose.connect(mongodb);
const db = mongoose.connection;
mongoose.connection.on('err', () => console.log('error'));

let users = [];
let posts = [];
let comments = [];

function createUser(username, passwd) {
    user = {
        username: username,
        hash: passwd,
    };

    const newUser = new User(user);
    newUser.save(err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('New user: ' + user);
        users.push(newUser);
    });
}

function createPost(title, content, user, kind = 'text') {
    textPost = {
        title: title,
        content: content,
        user: user,
        kind: kind,
    }

    const newPost = new Post(textPost);
    newPost.save(err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('New Post: ' + textPost);
        posts.push(newPost);
    })
}

createUser('hang', 'hang');
createUser('charlie', 'charlie');
createUser('ethan', 'ethan');
setTimeout(() => {
    createPost('hello', 'test content!', users[0]._id);
    createPost('hi', 'test content!', users[1]._id);
    createPost('hola', 'test content!', users[2]._id);
}, 2000)



