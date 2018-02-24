
const mongoose = require('mongoose');
const User = require('../schemas/user.js');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const argon2 = require('argon2');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err) }
        const message = 'Incorrect Username or password';
        if (!user) {
            return done(null, false, { message: message });
        }
        user.checkPassword(password)
            .then(result => {
                if (result) {
                    done(null, user);
                }
                else {
                    done(null, false, { message: message });
                }
            }).catch(err => {
                done(err)
            });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
})
//TODO: dedicated forms for logging in
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: 'true',
    }, next)
});

router.post('/create', async(req, res, next) => {
    let user = await User.findOne({ username: req.username });
    try {
        if (user) {
            // TODO: Inform the user that user is taken
        } else {
            const hash = await argon2.hash(req.password, { parallelism: 2 });
            let new_user = { username: req.username, hash: hash };
            await User.save(new_user);
        }
    } catch(e) {
            next(e)
    }
});

module.exports = router;
