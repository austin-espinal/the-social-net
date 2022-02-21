const router = require('express').Router();
const { } = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get()
    .post();

// /api/users/id 
router
    .route('/:id')
    .get()
    .put()
    .delete();

// /api/users/:userId/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post()
    .delete();

module.exports = router;