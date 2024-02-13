import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { router } from './routes/route.js';

dotenv.config()

export const app = express();
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 * 7,  
    secure: false
  }
}))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static("../public"))

app.use('/', router)


app.listen(process.env.PORT || 3000, () => {
  console.log(`Site lancé sur http://localhost:${process.env.PORT}`);
})