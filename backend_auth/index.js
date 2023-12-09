import express from 'express';
import mongoose from 'mongoose';
import router from './src/route/userRoute.js';
const DataBaseURL = "mongodb://asad:asad@ac-hh92axn-shard-00-00.gnsjmm2.mongodb.net:27017,ac-hh92axn-shard-00-01.gnsjmm2.mongodb.net:27017,ac-hh92axn-shard-00-02.gnsjmm2.mongodb.net:27017/?ssl=true&replicaSet=atlas-7so762-shard-0&authSource=admin&retryWrites=true&w=majority"
const app = express();


const Port = 8080;

app.use(express.json());
app.use('/api', router)
mongoose.connect(DataBaseURL)
    .then(() => {
        console.log('Connected to database');
        app.listen(Port, () => {
            console.log(`Server is running on port ${Port}`);
        });
    })
    .catch((err) => {
        console.log('Error: ', err.message);
    })
