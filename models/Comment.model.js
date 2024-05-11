const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true //requerido
        },

        evento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },

        comment: {
            type: String,
            required: true,
            minLenght: 10
        },

        title: {
            type: String,
            required: true,
            minLenght: 10
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        } 
    }, {
        timestamps: true
    });
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;