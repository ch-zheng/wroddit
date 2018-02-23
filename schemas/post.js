const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true, max: 120 },
    content: { type: String, required: true, max: 2000 },
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    root_comments: { type: [{ type: Schema.ObjectId, ref: 'Comment' }] },
    score: { type: Number, default: 0 },
    kind: { type: String, required: true, enum: ['text', 'link'] }
});

/*CommentSchema
    .virtual('url')
    .get(function() {
        return '/u/' + this._id;
    });*/

module.exports = mongoose.model('Post', PostSchema);
