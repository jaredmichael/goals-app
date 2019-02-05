'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { GoalPost } = require('./models');

const router = express.Router();

const passport = require('passport')
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/', jwtAuth, (req, res) => {
    console.log(req.user)
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
            console.error(err);
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
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.post('/', jwtAuth, jsonParser, (req, res) => {
    const requiredFields = ['goal', 'mantra'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
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
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.put('/:id', jwtAuth, jsonParser, (req, res) => {
    const requiredFields = ['goal', 'mantra', 'id'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).json({ message: message });
        }
    }

    const toUpdate = {};
    const updateableFields = ['goal', 'mantra'];

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

let server;

function runServer(databaseURL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
        })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
    });
});
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { router, runServer, closeServer };
