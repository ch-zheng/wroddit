const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: { type: String, required: true, max: 2000 },
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    replies: { type: [{ type: Schema.ObjectId, ref: 'Comment' }] },
    score: { type: Number, default: 1 },
});

CommentSchema
    .virtual('url')
    .get(function() {
        return '/u/' + this._id;
    });

module.exports = mongoose.model('Comment', CommentSchema);
