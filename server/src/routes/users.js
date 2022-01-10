const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require("../contollers/users");

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.getAllUsers
);

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.removeUser
);

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.createUser
);

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.updateUser
);

module.exports = router;