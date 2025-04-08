const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const keyValueRouter = require('./routes/health');
const storeRouter = require('./routes/store');
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/store', storeRouter);
app.use('/health', keyValueRouter);


console.log('updates');
console.log('Connecting to MongoDB...!');
mongoose.connect(`mongodb://${process.env.MONGODB_HOST}:27017/${process.env.KEY_VALUE_DB}`, {
    auth: {
        username: process.env.KEY_VALUE_USER,
        password: process.env.KEY_VALUE_PASSWORD,
    },
    connectTimeoutMS: 500,
}).then(() => {

    app.listen(port, () => { });

    console.log(`MongoDB connected successfully to port ${port}`);
}).catch((err) => {
    console.error('MongoDB connection error');
    console.error('MongoDB connection error:', err);
});

