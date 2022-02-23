const mongoose = require('mongoose');

// Define schema
// Add properties and their types
const userSchema = new mongoose.Schema({
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
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    }
});

// Use mongoose.model() to compile a user model on the schema
const User = mongoose.model('User', userSchema);

// Call error handler when an error occurs when saving a document
const handleError = (err) => console.error(err);

