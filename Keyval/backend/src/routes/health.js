
const express = require('express');
const { model } = require('mongoose');

const keyValueRouter = express.Router();

keyValueRouter.get('/', (req, res) => {
    res.status(200).send('a whole new thing form a new route');
});

module.exports = keyValueRouter;