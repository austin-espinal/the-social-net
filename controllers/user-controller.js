const { User } = require('../models')

const userController = {
    // /api/users

    // GET all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // POST create new user
    // example
    // {
    //     "username": "lernantino",
    //     "email": "lernantino@gmail.com"
    // }
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // /api/users/id 

    // GET single user by id and populate thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // PUT update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body)
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE user by id along with associated thoughts and removes user from other friend list
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                User.updateMany(
                    { _id: { $in: dbUserData.friends } },
                    { $pull: { friends: params.id } }
                )
                    .then(() => {
                        Thought.deleteMany({ username: dbUserData.username })
                            .then(() => {
                                res.json({ message: "User deleted sucessfully" });
                            })
                            .catch(err => res.status(400).json(err));
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    // /api/users/:id/friends/:friendId

    // POST add a new friend to a user's friend list and add user to friend's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $push: { friends: params.id } },
                    { new: true }
                )
                    .then(dbUser2Data => {
                        if (!dbUser2Data) {
                            res.status(404).json({ message: 'No User found with this friend id!' })
                            return;
                        }
                    })
                    .catch(err => res.json(err));
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // DELETE a friend from user's friend list and remove user from friend's friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $pull: { friends: params.id } },
                    { new: true }
                )
                    .then(dbUser2Data => {
                        if (!dbUser2Data) {
                            res.status(404).json({ message: 'No User found with this friend id!' })
                            return;
                        }
                    })
                    .catch(err => res.json(err));
                res.json({ message: 'Deleted friend sucessfully' });
            })
            .catch(err => res.json(err));
    }
}

module.exports = userController;