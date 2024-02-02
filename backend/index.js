import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { router } from './routes/route.js';
dotenv.config()

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("../public"))
app.use('/', router)
// parse application/json
app.use(bodyParser.json())

app.listen(process.env.PORT || 3000, () => {
  console.log(`Site lancé sur le port ${process.env.PORT}`);
})