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
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    // Populate thoughts that are associated with the User
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: " Thought "
        }
    ],
    // Populate friends that are associated with the User
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: " User "
        }
    ],
},
{
    toJSON:{
        virtuals: true,
    },
    id: false
});

// Set up schema
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;


