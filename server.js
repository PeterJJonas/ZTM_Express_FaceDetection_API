const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'peterjjonas',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();
const port = 3003;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('<h1 style="text-align: center; padding: 10px;">Server is running.<br>OK</h1>');});
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) =>{profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(port, () => {console.log('app is runing on port', port);})
