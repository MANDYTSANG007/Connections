const { Schema, model } = require('mongoose')
const moment = require('moment');

// Set up Reaction, a subdocument schema of Thought
var ReactionSchema = new schema({
    reactionId: {
        // Use Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        // Set default value to a new ObjectId
        default: new mongoose.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => moment(date).format("MM-DD-YYYY, hh:mm a"),
    },
})

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
        get: (date) => moment(date).format("MM-DD-YYYY, hh:mm a"),
    },
    username: {
        type: String,
        required: true,
    },
    //array of nested documents created with the reactionSchema
    reactions:[ReactionSchema],
},
{
    // Transform objects after querying db using toJSON
    toJSON: {
        virtuals: true,
        getters: true,
    },
    // Disable id
    id: false,  
});

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

// Use mongoose.model() to compile a thought model on the schema
const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;

