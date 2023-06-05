import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import serverless from 'serverless-http'
import fs from 'fs';


import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))


app.use(cors({
    origin: "https://css-fx.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
}));

app.use('https://cssfx-production.up.railway.app/posts', postRoutes)
app.use('/user', userRoutes)

const CONNECTION_URL = 'mongodb+srv://guilherme:4988010@cssfx.spmitbq.mongodb.net/?retryWrites=true&w=majority';
const PORT = 3333 || process.env.PORT 

mongoose.set("strictQuery", true);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conectado com o banco de dados");
        InitializeServer()
    }
    )
    .catch((error) => {
        console.log("Algo deu errado");
        console.log(error.message);
    }
    );

function InitializeServer() {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
}
