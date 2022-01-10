const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require("../contollers/science");

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.getAllSciences
);

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.removeScience
);

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.createScience
);

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.updateScience
);

module.exports = router;