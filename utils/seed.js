const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomThought, getRandomEmail, usernames, emails, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async ()=> {
    console.log('connected');

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Drop existing users
    await User.deleteMany({});

    // Create empty array to hold users for seeding
    const users = [];

    // Loop 3 times -- add users to the users array
    for (let i = 0; i<3; i++){
        const username = usernames[i]; 
        const email = emails[i]; 
        const thoughtText = thoughts[i];
        

        users.push({
            username,
            email,
            thoughtText,
        });

        let thought = new Thought({thoughtText});
        let user = new User({username, email});
        user.thoughts.push(thought);
        let savedUser = await user.save();
        console.log(`savedUser = ${savedUser}`);
    }
    // Get some random thought objects using a helper function that we imported from ./data
    //const thoughts = getRandomThought(3);

    // Log out the seed data to indicate what should appear in the db
    console.table(users);
    console.table(thoughts);
    console.info('Seeding is now completed!');
    process.exit(0);
});

