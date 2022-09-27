'use strict';

const express = require('express');
const { UsersModel } = require('./models');
const basicAuth = require('../auth/middleware/basic');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  console.log('I am here');
  try {
    let { username, password } = req.body;
    let encryptedPassword = await bcrypt.hash(password, 5);

    let user = await UsersModel.create({
      username,
      password: encryptedPassword,
    });

    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    next('signup error occurred');
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
});

router.get('/hello', basicAuth, (req, res, next) => {
  let { name } = req.query;
  res.status(200).send(`Greetings ${name}! this route is now secured by Basic AUth!!!`);
});

module.exports = router;
