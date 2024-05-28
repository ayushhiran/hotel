const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello World')
})


const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuRoutes');

app.use('/person', personRoutes);
app.use('/item', menuItemRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server running on port 3000');
})