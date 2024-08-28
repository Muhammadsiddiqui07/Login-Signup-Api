import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import mongoose from './db/index.js'


const app = express()
const db = mongoose.connection;
const port = 7000;

app.use(express.json())
app.use(cors())

db.on('Error---->', console.error.bind(console, 'Connection error'))
db.once('open', function () {
    console.log('db connected!');
})

app.use('/', (req, res, next) => {
    if (req.query.apikey == '123') {
        return next()
    }
    else {
        return res.status(401).send({ message: "Not Allowed" })
    }
})

app.use('/api', router);


app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
})