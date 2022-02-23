const mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/connectionsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Export connection
module.exports = mongoose.connection;