const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
        unique: true,
    },
    header:{
        type: String
    },
    body: {
        type: String,
    },
    footer: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
    },
    comment: [
        {
            username: String,
            content: String
        }
    ]
},{
    timestamps: true
})

module.exports = mongoose.model('Blog', BlogSchema)