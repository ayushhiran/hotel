const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.post('/', async function (req, res) {
    try {
        const data = req.body;
        const newItem = new MenuItem(data);
        const response = await newItem.save();
        console.log('Data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error while saving data' })
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Data is ', data);
        res.status(200).json(data);
    }
    catch (err) {
        console.log("error ", err);
        res.status(500).json({ error: 'Error while retriving data' });
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (['sweet', 'spicy', 'sour'].includes(taste)) {
            const data = await MenuItem.countDocuments({});
            // const data = await MenuItem.find({ taste: taste }).countDocuments();
            console.log(data);
            res.status(200).json(data);
        }
        else {
            res.status(500).json({ error: "Invalid Taste" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Something went wrong" });
    }
})

module.exports = router