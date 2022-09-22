const mongoose = require("mongoose");

//Establish connection to mondodb database using mongoose
const {MONGO_URI}  = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI ).then ( ()=> {
        console.log('Mongodb connection successfull');
    }
    ).catch ( (err)=> {
        console.log('Mongodb connection failed');
    });
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));    
}

