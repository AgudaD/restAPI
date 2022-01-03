//creting a server

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const app = express();

app.get('/', (req, res) => {
    res.send('We are live');
})

//connecting to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })

const db = mongoose.connection
// if theres an error
db.on('error', (error)=> console.log(error))
// if connected successfully
db.once('open', ()=> console.log("connected to db"))


app.use(express.json())

//route our users information
const usersRouter = require('./routes/users') 
app.use('/users', usersRouter)


app.listen(3000, () => console.log('running'))
