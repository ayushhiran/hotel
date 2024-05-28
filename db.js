const mongoose = require('mongoose');

const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/hotel';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.log('Error in MongoDB Server', err);
});

db.on('disconnected', () => {
    console.log('DisConnected from MongoDB Server');
});

module.exports = db;