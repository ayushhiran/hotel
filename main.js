const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello World')
})


const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuRoutes');

app.use('/person', personRoutes);
app.use('/item', menuItemRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})