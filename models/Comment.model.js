const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        evento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },

        comment: {
            type: String,
            required: true
        }


    }
)
const Comment = mongoose.comment("Comment", commentSchema);

module.exports = Comment;