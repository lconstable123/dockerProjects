const express = require('express');
const storeRouter = express.Router();
const KeyValue = require('../models/keyValue');

storeRouter.post('/', async (req, res) => {
    console.log('posting...');
    const { key, value } = req.body;

    if (!key || !value) {
        return res.status(400).send('Key and value are required');
    }
    console.log(`${key}, and ${value} are there, so far so good`);
    try {
        const existingKey = await KeyValue.findOne({ key });
        if (existingKey) {
            return res.status(400).json({ error: 'Key already exists' });
        }
        console.log('keyvalue is unique, so far so good');
        const keyValue = new KeyValue({ key, value });
        await keyValue.save();
        return res.status(201).json({ message: 'Key-value pair created successfully' });
    } catch (err) {
        return res.status(500).send(`Internal server error, ${err}`);
    }
})
storeRouter.get('/', async (req, res) => {

    try {
        const items = await KeyValue.find();
        if (!items) {
            return res.status(400).json({ error: 'no items' });
        }
        console.log('retrieve successful');
        res.status(200).json(items);
    } catch (err) {
        return res.status(500).send(`Internal server error, ${err}`);
    }
})





storeRouter.get('/:key', async (req, res) => {
    const itemkey = req.params.key
    if (!itemkey) {
        return res.status(400).send('Key is required');
    }
    try {
        const value = await KeyValue.findOne({ key: itemkey });
        if (!value) {
            return res.status(404).json({ error: 'no such value' });
        }
        console.log('retrieve successful');
        res.status(200).json({ itemkey: value })
    } catch (err) {
        return res.status(500).send(`Internal server error, ${err}`);
    }
})

storeRouter.put('/:key', async (req, res) => {
    const itemkey = req.params.key
    const { value } = req.body;
    if (!itemkey || !value) {
        return res.status(400).send('Key or value is required');
    }
    try {
        const exists = await KeyValue.findOne({ key: itemkey });
        if (!exists) {
            return res.status(404).json({ error: 'no such value' });
        }
        // console.log('retrieve successful');
        const keyValue = await KeyValue.findOneAndUpdate({ key: itemkey }, { value }, { new: true })
        if (!keyValue) {
            return res.status(404).json({ error: 'error updating' });
        }
        res.status(200).json({ status: 'updated' })
    } catch (err) {
        return res.status(500).send(`Internal server error, ${err}`);
    }
})

storeRouter.delete('/:key', async (req, res) => {
    const itemkey = req.params.key
    if (!itemkey) {
        return res.status(400).send('Key is required');
    }
    try {
        const value = await KeyValue.findOneAndDelete({ key: itemkey });
        if (!value) {
            return res.status(404).json({ error: 'no such value' });
        }
        console.log('delete successful');
        res.status(200).json({ itemkey: value })
    } catch (err) {
        return res.status(500).send(`Internal server error, ${err}`);
    }
});

module.exports = storeRouter;