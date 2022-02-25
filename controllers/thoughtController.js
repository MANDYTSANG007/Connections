// Import models
const { resolveSoa } = require('dns');
const { User, Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts)=> res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.id })
            .then((thought)=> 
                !thought
                    ? res.status(400).json({ message: 'No thought with that ID'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res){
        Thought.create(req.body)
            .then((thought)=> {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: {thoughts: _id }},
                    { runValidators: true, new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'No thought with that Id'})
                    : res.json(thought)
                )
            .catch((err)=> res.status(500).json(err));
    },
    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.id},
        )
            .then((thought)=>
                !thought
                    ?res.status(400).json({ message: 'No thought with that ID'})
                    :res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res){
        Thought.findOneAndDelete(
            { _id: req.params.id }
        )
            .then((thought) =>
                !thought
                    ?res.status(404).json({ message: 'No thought with that ID'})
                    :res.json(thought)
            )
            .catch((err)=> res.status(500).json(err));
    },
    addReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
            .then((thought)=>
                !thought
                    ?res.status(404).json({ message: 'No thought with that ID'})
                    :res.json(thought)
            )
            .catch((err)=> res.status(500).json(err));
    },
    deleteReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
            .then((thought)=>
                !thought
                    ?res.status(404).json({ message: 'No thought with that ID'})
                    :res.json(thought)
            )
            .catch((err)=> res.status(500).json(err));
    },
}



// /api/thoughts
// GET to get all thoughts
// GET to get a single thought by its _id
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value