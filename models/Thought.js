var mongoose = require('mongoose');
const { schema } = require('./User');

var ThoughtSchema = new schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    }
})