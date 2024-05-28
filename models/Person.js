const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        enum: ['chef', 'waiter', 'manager']
    },
    mobile: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    age: Number,
    address: String
});

const personModel = mongoose.model('Person', personSchema);
module.exports = personModel;