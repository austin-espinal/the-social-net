const { Thought, User } = require('../models')

const thoughtController = {
        // /api/thoughts

        // GET all thoughts
        getAllThoughts(req, res) {
                Thought.find({})
                        .then(dbThoughtData => res.json(dbThoughtData))
                        .catch(err => {
                                console.log(err);
                                res.status(400).json(err);
                        })
        },

        // GET single thought by id
        getThoughtById({ params }, res) {
                User.findOne({ _id: params.id })
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
                                        { _id: params.userId },
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

        // PUT update thought by id
        updateThought({ params, body }, res) {
                Thought.findOneAndUpdate({ _id: params.id }, body)
                        .then(dbThoughtData => {
                                if (!dbThoughtData) {
                                        res.status(404).json({ message: 'No User found with this id!' })
                                        return;
                                }
                                res.json(dbThoughtData);
                        })
                        .catch(err => res.status(400).json(err));
        },

        // DELETE thought by id
        deleteThought({ params }, res) {
                Thought.findOneAndDelete({ _id: params.thoughtId })
                        .then(deletedThought => {
                                if (!deletedThought) {
                                        return res.status(404).json({ message: 'No Thought with this id!' });
                                }
                                return User.findOneAndUpdate(
                                        { _id: params.userId },
                                        { $pull: { comments: params.thoughtId } },
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

        // /api/thoughts/:thoughtId/reactions

        //POST create reaction and store it in the associated thought's reaction array
        addReaction({ params, body }, res) {
                Thought.findOneAndUpdate(
                        { _id: params.thoughtId },
                        { $push: { reactions: body } }
                )
                        .then(dbThoughtData => {
                                if (!dbThoughtData) {
                                        res.status(404).json({ message: 'No Thought found with this id!' });
                                        return;
                                }
                                res.json(dbThoughtData);
                        })
                        .catch(err => res.json(err));
        },

        //DELETE a reaction by reactionId
        removeReaction({ params }, res) {
                Thought.findOneAndUpdate(
                        { _id: params.thoughtId },
                        { $pull: { reactions: { reactionId: params.reactionId } } },
                        { new: true }
                )
                        .then(dbThoughtData => res.json(dbThoughtData))
                        .catch(err => res.json(err));
        }
};

module.exports = thoughtController;