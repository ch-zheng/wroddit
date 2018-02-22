const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextPostSchema = new Schema({
    title: { type: String, required: true, max: 120 },
    content: { type: String, required: true, max: 2000 },
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    root_comments: { type: [{ type: Schema.ObjectId, ref: 'Comment' }] },
});

/*CommentSchema
    .virtual('url')
    .get(function() {
        return '/u/' + this._id;
    });*/

module.exports = mongoose.model('TextPost', TextPostSchema);
