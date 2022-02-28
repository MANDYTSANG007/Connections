const { Schema, model, Types } = require('mongoose')
const moment = require('moment');

// Set up Reaction, a subdocument schema of Thought
var reactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    author: {
        type: "ObjectId",
        ref: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => moment(date).format("MM-DD-YYYY, hh:mm a"),
    },
})

var thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => moment(date).format("MM-DD-YYYY, hh:mm a"),
    },
    author: {
        type: "ObjectId",
        ref: "user"
    },
    //array of nested documents created with the reactionSchema
    reactions:[reactionSchema],
},
{
    // Transform objects after querying db using toJSON
    toJSON: {
        virtuals: true,
        getters: true,
    }, 
});

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

