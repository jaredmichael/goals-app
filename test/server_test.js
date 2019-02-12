"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const expect = chai.expect;

const { app, runServer, closeServer } = require("../server");
const { User } = require("../users/models")

chai.use(chaiHttp);

describe("Goal Posts", function () {
    const username = 'exampleUser';
    const password = 'examplePass';

    before(function () {
        return runServer();
    });
    after(function () {
        return closeServer();
    });

    beforeEach(function () {
        return User.hashPassword(password).then(password =>
            User.create({
                username,
                password,
            })
        );
    });

    afterEach(function () {
        return User.remove({});
    });

    it("should list goals on GET", function () {

        const token = jwt.sign(
            {
                username,
            },
            JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '7d'
            }
        );

        return chai
            .request(app)
            .get("/api/goals")
            .set('Authorization', `Bearer ${token}`)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a("array");
                res.body.forEach(function (item) {
                    expect(item).to.be.a("object");
                    expect(item).to.have.all.keys(
                        "id",
                        "goal",
                        "mantra",
                        "status"
                    );
                });
            });
    });

    it("should add a new goal on POST", function () {
        const newPost = {
            goal: "Test app",
            mantra: "Everything works!"
        };
        const expectedKeys = ["id"].concat(Object.keys(newPost));

        return chai
            .request(app)
            .post("/api/goals")
            .send(newPost)
            .then(function (res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.all.keys(expectedKeys);
                expect(res.body.goal).to.equal(newPost.goal);
                expect(res.body.mantra).to.equal(newPost.mantra);
            });
    });

    it("should error if POST is missing expected values", function () {
        const badRequestData = {};
        return chai
            .request(app)
            .post("/api/goals")
            .send(badRequestData)
            .then(function (res) {
                expect(res).to.have.status(400);
            });
    });

    it("should update goal posts on PUT", function () {
        return (
            chai
                .request(app)
                .get("/api/goals")
                .then(function (res) {
                    const updatedGoal = Object.assign(res.body[0], {
                        goal: "Updated goal",
                        mantra: "I've updated my goals and am sticking to it!"
                    });
                    return chai
                        .request(app)
                        .put(`/api/goals/${res.body[0].id}`)
                        .send(updatedPost)
                        .then(function (res) {
                            expect(res).to.have.status(204);
                        });
                })
        );
    });

    it("should delete posts on DELETE", function () {
        return (
            chai
                .request(app)
                .get("/api/goals")
                .then(function (res) {
                    return chai
                        .request(app)
                        .delete(`/api/goals/${res.body[0].id}`)
                        .then(function (res) {
                            expect(res).to.have.status(204);
                        });
                })
        );
    });

    it("should add new user on POST", function () {
        const newUser = {
            username: "testNewUser",
            password: "testPassword"
        };
        const expectedKeys = ["id"].concat(Object.keys(newUser));

        return chai
            .request(app)
            .post("/api/users")
            .send(newUser)
            .then(function (res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.all.keys(expectedKeys);
                expect(res.body.username).to.equal(newUser.username);
                expect(res.body.password).to.equal(newUser.password);
            });
    });

});