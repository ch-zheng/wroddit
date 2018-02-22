const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true
    }    
});

UserSchema
    .virtual('url')
    .get(function() {
        return '/u/' + this.username
    });

UserSchema
    .virtual('name')
    .get(function() {
        return this.username;
    });

module.exports = mongoose.model('User', UserSchema);

