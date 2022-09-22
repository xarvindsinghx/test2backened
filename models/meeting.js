const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    schedulerErpID: {
        type: Number,
        required: true
    },
    receipientErpId: {
        type: Number,
        required: true,
    },
    topic: {
        type: String
    },
    datetime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["NOT-ACCEPTED", "ACCEPTED", "REJECTED"],
        default: "NOT-ACCEPTED"
    }
});


const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting