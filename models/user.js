const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30
    },
    erpId: {
        type: Number,
        length: 8,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        length: 10,
        required: true,
        unique: true
    },
    email: {
        type: String,
        length: 40,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 80,
    },
    address: {
        type: String,
        maxLength: 60,
    },
    roles: [
        {
            type: String,

        }
    ],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    aboutMe:{
        type: String,
        maxLength: 250
    },
    programmingSkills: [
        {
            type: String,
            maxLength: 20
        }
    ],
    developmentSkills: [
        {
            type: String,
            maxLength: 100
        }
    ],
    achievements: [
        {
            type: String,
            maxLength: 100
        }
    ],
    resumeLink: {
        type: String,
        maxLength: 100
    }
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString()
    },  process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}

const User = mongoose.model('User', userSchema);

module.exports = User