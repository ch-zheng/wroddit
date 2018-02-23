//index.js
'use strict';

//Imports
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Post = require('./schemas/post.js');
const User = require('./schemas/user.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

mongoose.connect('mongodb://crack:crack@ds243728.mlab.com:43728/wroddit');

const db = mongoose.connection;
mongoose.promise = global.Promise;
db.on('error', () => console.log("failure"));
db.once('open', () => {
    console.log('succesfully established a connection to mongodb');
})

const wrodditRouter = require('./routes/wroddit.js')
const server = express();

server.use(express.static('public'));
server.use(cookieParser());
server.use(bodyParser({
    extended: true,
}));
server.use(session({ 
    secret: 'faosipejfaoisfnaiofnosfjaopifjaiopfnaoienfo',
    resave: false,
    saveUninitialized: false,
}));
server.use(passport.initialize());
server.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err) }
        const message = 'Incorrect Username or password';
        if (!user) {
            return done(null, false, { message: message });
        }
        user.checkPassword(password)
            .then(result => {
                if (result) {
                    return done(null, user);
                }
                return done(null, false, { message: message });
            }).catch(err => {
                return done(err)
            });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
})

//Template engine (hbs)
hbs.registerPartials(path.join(__dirname + '/views/partials'));

//Express settings
server.set('view engine', 'hbs');
server.use(express.static(path.join(__dirname, 'public')));

//Express routing
server.get('/', (req, res) => res.redirect('/w/frankenstein'));
server.use('/w/frankenstein', wrodditRouter);
server.post('/api/upvote/:postId', async (req, res, next) => { 
    try {
        await upvotePost(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});
server.post('/api/downvote/:postId', async (req, res) => {
    try {
        await downvotePost(req.params.id);
        res.sendStatus(200);
    } catch(e) {
        next(e);
    }
});

server.listen(3000, () => console.log('Listening on port 3000'));

async function upvotePost(id) {
    console.log('upvoting post');
    return await Post.findByIdAndUpdate(new ObjectId(id), {$inc: {score: 1}}); 
}

async function downvotePost(id) {
    console.log('downvoting post');
    return await Post.findByIdAndUpdate(new ObjectId(id), {$inc: {score: -1}});
}
