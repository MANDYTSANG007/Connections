const {Schema, model}= require('mongoose');

// Use the Schema constructor to create a new userSchema object
// Add properties and their types
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true ,
        trim: true ,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match email using regex
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address'],
    },
   friends: [
        {
            type: "ObjectId",
            ref: "user"
        }
   ]
},
{
    toJSON:{
        virtuals: true,
    },
});

// Set up schema
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema.virtual('friendCount').get(function(){
    return this.friends ? this.friends.length : 0;
});

userSchema.virtual('thoughts', {
    ref: "thought",
    foreignField: "author",
    localField: "_id"
});

const User = model('user', userSchema);

module.exports = User;


