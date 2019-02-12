'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { GoalPost } = require('./models');

const router = express.Router();

const passport = require('passport')
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth, (req, res) => {
    GoalPost
        .find({
            userId: req.user.id
        })
        .then(goals => {
            res.json({
                goals: goals.map(
                    (goals) => goals.serialize())
            });
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.get('/:id', jwtAuth, (req, res) => {
    GoalPost
        .findById(req.params.id)
        .then(goal => {
            res.json(
                goal.serialize()
            );
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.post('/', jwtAuth, jsonParser, (req, res) => {
    const requiredFields = ['goal', 'mantra'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            return res.status(400).send(message);
        }
    }

    GoalPost
        .create({
            goal: req.body.goal,
            mantra: req.body.mantra,
            userId: req.user.id
        })
        .then(goal => res.status(201).json(goal.serialize()))
        .catch(err => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.put('/:id', jwtAuth, jsonParser, (req, res) => {
    const toUpdate = {};
    const updateableFields = ['goal', 'mantra', 'status'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    GoalPost
        .findByIdAndUpdate(req.params.id, { $set: toUpdate })
        .then(goal => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.delete('/:id', (req, res) => {
    GoalPost
        .findByIdAndRemove(req.params.id)
        .then(goal => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.use('*', function (req, res) {
    res.status(404).json({ message: 'Not Found' });
});

module.exports = { router };
