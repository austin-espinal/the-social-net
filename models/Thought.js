const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {}
)

const ThoughtSchema = new Schema(
    {}
)

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;