'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const goalPostSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    goal: { type: String, required: true },
    mantra: { type: String, required: true },
    created: { type: Date, default: Date.now },
    status: { type: String }
});

goalPostSchema.methods.serialize = function () {
    return {
        id: this._id,
        goal: this.goal,
        mantra: this.mantra,
        created: this.created,
        status: this.status
    };
};

const GoalPost = mongoose.model('GoalPost', goalPostSchema);

module.exports = { GoalPost };