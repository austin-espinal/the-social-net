const { Thought, User } = require('../models')

const thoughtController = {
        // /api/thoughts

// GET all thoughts

// GET single thought by id

// POST create new thought and push to associated user's thought array
// example
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

// /api/thoughts/id 

// PUT update thought by id

// DELETE thought by id


// /api/thoughts/:thoughtId/reactions

//POST create reaction and store it in the associated thought's reaction array

//DELETE a reaction by reactionId
}

module.exports = thoughtController;