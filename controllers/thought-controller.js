const { Thought, User } = require('../models')

const thoughtController = {
        // /api/thoughts

        // GET all thoughts
        getAllThoughts(req, res) {
                Thought.find({})
                        .select('-__v')
                        .then(dbThoughtData => res.json(dbThoughtData))
                        .catch(err => {
                                console.log(err);
                                res.status(400).json(err);
                        })
        },


        // POST create new thought and push to associated user's thought array
        // example
        // {
        //     "thoughtText": "Here's a cool thought...",
        //     "username": "lernantino",
        //     "userId": "5edff358a0fcb779aa7b118b"
        // }
        createThought({ params, body }, res) {
                Thought.create(body)
                        .then(({ _id }) => {
                                return User.findOneAndUpdate(
                                        { _id: body.userId },
                                        { $push: { thoughts: _id } },
                                        { new: true }
                                );
                        })
                        .then(dbUserData => {
                                if (!dbUserData) {
                                        res.status(404).json({ message: 'No User found with this id!' });
                                        return;
                                }
                                res.json(dbUserData);
                        })
                        .catch(err => res.json(err));
        },

        // /api/thoughts/id 

        // GET single thought by id
        getThoughtById({ params }, res) {
                Thought.findOne({ _id: params.id })
                        .populate({
                                path: 'reactions',
                                select: '-__v'
                        })
                        .select('-__v')
                        .then(dbThoughtData => {
                                if (!dbThoughtData) {
                                        res.status(404).json({ message: 'No Thought found with this id!' });
                                        return;
                                }
                                res.json(dbThoughtData);
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(400).json(err);
                        });
        },

        // PUT update thought by id
        updateThought({ params, body }, res) {
                Thought.findOneAndUpdate({ _id: params.id }, body)
                        .then(dbThoughtData => {
                                if (!dbThoughtData) {
                                        res.status(404).json({ message: 'No User found with this id!' })
                                        return;
                                }
                                res.json({ message: 'Thought updated' });
                        })
                        .catch(err => res.status(400).json(err));
        },

        // DELETE thought by id
        deleteThought({ params }, res) {
                Thought.findOneAndDelete({ _id: params.id })
                        .then(deletedThought => {
                                if (!deletedThought) {
                                        return res.status(404).json({ message: 'No Thought with this id!' });
                                }
                                return User.findOneAndUpdate(
                                        { username: deletedThought.username },
                                        { $pull: { thoughts: params.id } },
                                        { new: true }
                                );
                        })
                        .then(dbUserData => {
                                if (!dbUserData) {
                                        res.status(404).json({ message: 'No User found with this id!' });
                                        return;
                                }
                                res.json(dbUserData);
                        })
                        .catch(err => res.json(err));
        },

        // /api/thoughts/:id/reactions

        //POST create reaction and store it in the associated thought's reaction array
        addReaction({ params, body }, res) {
                Thought.findOneAndUpdate(
                        { _id: params.id },
                        { $push: { reactions: body } }
                )
                        .then(dbThoughtData => {
                                if (!dbThoughtData) {
                                        res.status(404).json({ message: 'No Thought found with this id!' });
                                        return;
                                }
                                res.json({ message: 'Reaction added successfully' });
                        })
                        .catch(err => res.json(err));
        },

        // /api/thoughts/:id/reactions/reactionId

        //DELETE a reaction by reactionId
        removeReaction({ params }, res) {
                Thought.findOneAndUpdate(
                        { _id: params.id },
                        { $pull: { reactions: { _id: params.reactionId } } },
                        { new: true }
                )
                        .then(dbThoughtData => {
                                if (!dbThoughtData) {
                                        res.status(404).json({ message: 'No Thought found with this id!' });
                                        return;
                                }
                                res.json(dbThoughtData);
                        })
                        .catch(err => res.json(err));
        }
};

module.exports = thoughtController;