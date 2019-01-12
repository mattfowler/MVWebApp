const express = require('express');
const router = express.Router();
const User = require('../db/model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ValidateJWT = require('../auth/ValidateJWT');

function ValidateUsernamePassword(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({message: 'Please provide both username and password'});
    } else {
        next();
    }
}

router.post('/', ValidateUsernamePassword, (req, res, next) => {
    User.findOne({where: {username: req.body.username}}).then(user => {
        if (!user) {
            User.create({username: req.body.username, password: bcrypt.hashSync(req.body.password)})
                .then(() => res.status(201).send({message: "Created user."}))
                .catch(err => next(err));
        } else {
            res.status(400).send({message: "Username already exists."});
        }
    }).catch(err => next(err));
});

router.post('/login', ValidateUsernamePassword, (req, res, next) => {
    User.findOne({where: {username: req.body.username}}).then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            jwt.sign({userId: user.id},
                     ValidateJWT.TOKEN_SECRET,
                     {expiresIn: 24 * 7 * 60 * 60},
                (err, token) => {
                    err ? next(err) : res.json({token: token});
                });
        } else {
            res.status(400).send({message: "Invalid credentials!"});
        }
    }).catch(err => next(err));
});

router.get('/me', ValidateJWT, (req, res, next) => {
    User.findOne({where: {id: req.userId}}).then(user => {
        res.json({username: user.username, createdAt: user.created_at});
    }).catch(err => next(err));
});


module.exports = router;
