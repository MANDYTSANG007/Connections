// Import User model
const { User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find().populate('thoughts')
            .then(
                (users)=> res.json(users)
                )
            .catch(
                (err)=> res.status(500).json(err)
                );
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({ path: "thoughts", model: Thought})
            .then((user)=>
                !user
                    ?res
                        .status(404)
                        .json({ message: "No user with that ID"})
                    :res.json(user)
            )
            .catch((err) => 
            res.status(500).json(err));
    },
    createUser(req, res){
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res){
        User.findOneAndUpdate(
            { _id: req.params.id}, req.body, {new: true}
        )
            .then((user)=>
            !user
                ?res
                    .status(404)
                    .json({ message: "No user found with that ID"})
                :res.json(user)
            )
            .catch((err) => 
            res.status(500).json(err));
    },
    deleteUser(req, res){
        User.findOneAndDelete(
            { _id: req.params.id }
        )
            .then((user) =>
            !user
                ?res
                    .status(404)
                    .json({ message: "No user with that ID"})
                :Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: 'User and thoughts deleted!'}))
            .catch((err) => res.status(500).json(err)); 
    },
    addFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: {friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
            .then((user)=>
                !user
                    ?res
                        .status(404)
                        .json({ message: "No user with that ID"})
                    :res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: {friendId: req.params.friendId }}},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ?res
                    .status(404)
                    .json({ message: "no user found with that ID"})
                :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};
















// /api/users
// GET all users
// GET a single user by its _id and populated thought and friend data
// POST a new user:
// PUT to update a user by its _id
// DELETE to remove user by its _id
// Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list