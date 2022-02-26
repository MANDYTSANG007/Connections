const username = [
    "Margaret",
    "Albert",
    "John"
];

const email = [
    "margaretH@gmail.com",
    "albertE@gmail.com",
    "johnW@gmail.com"
];

const thoughtText = [
    "Don't let fear get in the way and don't be afraid to say 'I don't know' or 'I don't understand'.",
    "The true sign of intelligence is not knowledge but imagination.",
    "It takes time to create excellence. If it cold be done quicklym more people would do it.",
]

//Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random()* arr.length)];

//Get a random username
const getRandomUsername = () => `${getRandomArrItem(username)}`;

//Get a random email
const getRandomEmail = () => `${getRandomArrItem(email)}`;

//Get a random thought
const getRandomThought = (arr) => {
    const results = [];
    for (let i=0; i<arr; i++) {
        results.push({
            thoughts: getRandomArrItem(thoughtText),
            username: getRandomUsername().split(' ')[0],
            email: getRandomEmail().split(' ')[0],
        });
    }
    return results;
}

module.exports = { getRandomThought, getRandomUsername,};