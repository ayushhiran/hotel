const express = require('express');
const router = express.Router();
const Person = require('../models/Person');


router.post('/', async function (req, res) {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
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
        const data = await Person.find();
        console.log('Data is ', data);
        res.status(200).json(data);
    }
    catch (err) {
        console.log("error ", err);
        res.status(500).json({ error: 'Error while retriving data' });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (['chef', 'waiter', 'manager'].includes(workType)) {
            const data = await Person.find({ role: workType });
            console.log('Data is ', data);
            res.status(200).json(data);
        }
        else {
            res.status(400).json({ error: 'Invalid Work Type' });
        }
    }
    catch (err) {
        console.log("error ", err);
        res.status(500).json({ error: 'Error while retriving data' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const personUpdatedData = req.body;
        const response = await Person.findByIdAndUpdate(id, personUpdatedData, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            res.status(404).json({ message: "Person not found" });
        }
        console.log("data updated", response);
        res.status(200).json(response);
    }
    catch (err) {
        console.log("error", err);
        res.status(500).json({ error: "Something went wrong" });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        console.log('inside delete');
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);
        if (!response) {
            res.status(404).json({ error: "Record Not Found" });
        }
        console.log('Data deleted ', response);
        res.status(200).json({ message: "Data deleted" })
    }
    catch (err) {
        console.log("error ", err);
        res.status(500).json({ error: "Something went wrong" });
    }
})

module.exports = router;