require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const userRouter = require('./routes/user');
app.use('/user', userRouter);

// fat arrow function or anonymous function or lambda function, call back function
// asynscronous, syncronous
app.listen(5000, () => {
    console.log('Server started  on port 5000');
})

