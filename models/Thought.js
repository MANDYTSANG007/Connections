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
    reactions:[reactionSchema],
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