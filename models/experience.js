const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    // phoneNumber is unique key for each user
    // store experinces of the user whose phone number is this
    phoneNumber: {
        type: String,
        required: true,
        maxLength: 30
    },
    companyName: {
        type: String,
        length: 10,
        required: true
    },
    position: {
        type: String,
        length: 10,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
    },
    text: {
        type: String,
        maxLength: 200
    }
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience