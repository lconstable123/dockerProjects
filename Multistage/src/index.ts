import express from 'express';
const app = express();
const num: number = 5;
const str: string = 'Hello World!';
const boolie: boolean | string = true;
const port = process.env.PORT;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('Server is running');
});