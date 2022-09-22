const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userOrgSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    designation: {
        type: String,
        enum: ["JE", "AE", "EE", "SE", "CE", "D-IT"],
        default: "JE"
    },
    location: {
        type: String,
        required: true
    },
    reportingUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
        default: new Date('December 31, 9999 23:59:59')
    }
});


const User = mongoose.model('UserOrg', userOrgSchema);

module.exports = User