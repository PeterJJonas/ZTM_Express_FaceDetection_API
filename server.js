const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
const port = 3003;

// app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'Ross',
      email: 'ross@typo.com',
      password: 'sandiabla',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Rosa',
      email: 'rosa@typo.com',
      password: 'sandiablo',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '345',
      hash: '',
      email: 'rossssss@typo.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
      console.log(database.users[0]);
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json('no such user');
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(404).json('no such user');
  }
})

// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// });
//





app.listen(port, () => {
  console.log('app is runing on port', port);
})
