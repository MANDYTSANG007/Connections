const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts);

// /api/thoughts/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:userId
router.route('/:userId').post(createThought);

// /:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /:thoughtId/reactions/:reactionsId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;

