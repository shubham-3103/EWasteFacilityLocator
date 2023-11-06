const mongoose = require('mongoose');

const authenticateSchema = new mongoose.Schema({
    email: String,
    item: String,
    isSubmitted: Boolean,
    //changing 
    points:Number,
    count:Number
});

const Authenticate = mongoose.model('Authenticate', authenticateSchema);

module.exports = Authenticate;
