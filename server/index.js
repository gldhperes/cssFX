import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs';


import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use( cors() )
// app.use(express.json());
app.use('/posts', postRoutes)
app.use('/user', userRoutes)

// const CONNECTION_URL = 'mongodb+srv://guilherme:4988010@cssfx.spmitbq.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);

mongoose.connect( process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => app.listen( PORT,() => {
            console.log(`Server running on port ${PORT}`)
        }
    ))
    .catch( (error) => {
            console.log(error.message);
        }
    )
