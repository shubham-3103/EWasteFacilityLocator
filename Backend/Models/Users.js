const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    points: Number
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
