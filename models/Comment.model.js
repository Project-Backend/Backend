const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //requerido
        },

        evento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },

        comment: {
            type: String,
            required: true
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }


    }
)
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;