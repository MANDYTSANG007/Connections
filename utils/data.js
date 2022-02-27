const usernames = [
    "Margaret",
    "Albert",
    "John"
];

const emails = [
    "margaretH@gmail.com",
    "albertE@gmail.com",
    "johnW@gmail.com"
];

const thoughts = [
    "Don't let fear get in the way and don't be afraid to say 'I don't know' or 'I don't understand'.",
    "The true sign of intelligence is not knowledge but imagination.",
    "It takes time to create excellence. If it cold be done quicklym more people would do it.",
]

//Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random()* arr.length)];

//Get a random username
const getRandomUsername = () => `${getRandomArrItem(usernames)}`;

//Get a random email
const getRandomEmail = () => `${getRandomArrItem(emails)}`;

//Get a random thought
const getRandomThought = (arr) => {
    const results = [];
    for (let i=0; i<arr; i++) {
        results.push({
            thoughts: getRandomArrItem(thoughts),
            username: getRandomUsername().split(' ')[0],
            email: getRandomEmail().split(' ')[0],
        });
    }
    return results;
}

//Get a random thought
// const getRandomUsername = (arr) => {
//     const results = [];
//     for (let i=0; i<arr; i++) {
//         results.push({
//             thoughts: getRandomArrItem(thoughtText),
//             username: getRandomUsername().split(' ')[0],
//             //email: getRandomEmail().split(' ')[0],
//         });
//     }
//     return results;
// }

module.exports = { getRandomThought, getRandomUsername, getRandomEmail, usernames, emails, thoughts};