const mongoose = require('mongoose');

// Use the Schema constructor to create a new UserSchema object
// Add properties and their types
const UserSchema = new mongoose.Schema({
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
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    // Populate thoughts that associated with the User
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: " Thought "
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: " User "
        }
    ],
});

// Set up schema
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// Use mongoose.model() to compile a user model on the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;


