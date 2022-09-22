const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
    // phoneNumber is unique key for each user
    // store recommendations of the user whose phone number is this
    phoneNumber: {
        type: String,
        required: true,
        maxLength: 30
    },
    // name stores name of the person who recommended
    name: {
        type: String,
        length: 10,
        required: true
    },
    position: {
        type: String,
        length: 10,
        required: true,
    },
    recommendationdate: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        maxLength: 200
    }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation