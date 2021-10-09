const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    username: {
        type: String
    },
    user_avatar: {
        type: String
    },
    content: {
        type: String,
        required: true 
    },
    title: {
        type: String,
        required: true 
    },
    date: {
        type: Date,
        default: Date.now()
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            text: {
                type: String,
                required: true
            },
            username: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;