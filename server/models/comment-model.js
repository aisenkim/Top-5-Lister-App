const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
    {
        ownerName: {type: String, required: true},
        comment: {type: String, required: true},
        listId: {type: Schema.Types.ObjectId, ref: 'Top5List'}
    },
    {timestamps: true}
)

module.exports = mongoose.model('Comment', CommentSchema);