const mongoose = require('mongoose');
const argon2 = require('argon2');

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

UserSchema.methods.checkPassword = async function(password) {
    try {
        return await argon2.verify(this.hash, password);
    } catch(e) {
        throw(e)
    }
}

module.exports = mongoose.model('User', UserSchema);

