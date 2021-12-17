import express, { Express } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import cors from 'cors'
import todoRoutes from './routes'
// const mongoose = require('mongoose');

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(todoRoutes)

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
// const options = { useNewUrlParser: true, useUnifiedTopology: true }
// mongoose.set('useFindAndModify', false)

const localUri: string = process.env.MONGOLOCALURI || "";

mongoose
    .connect(localUri, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error : Error) => {
        throw error
    })
