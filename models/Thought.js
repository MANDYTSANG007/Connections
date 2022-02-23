var mongoose = require('mongoose');
const { schema } = require('./User');

var ThoughtSchema = new schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true,
    },
    //array of nested documents created with the reactionSchema
    reactions:[
        reactionSchema
    ],
});

//TODO:
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.