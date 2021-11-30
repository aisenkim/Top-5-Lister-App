const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityListSchema = new Schema(
    {
        name: {type: String, required: true},
        items: {type: [{name: String, points: Number}], required: true},
        views: {type: Number, required: true},
        like: {type: [String], required: true},
        dislike: {type: [String], required: true},
    },
    {timestamps: true},
)

module.exports = mongoose.model('CommunityList', CommunityListSchema)
