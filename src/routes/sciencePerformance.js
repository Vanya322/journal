const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require("../contollers/sciencePerformance");

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.createSciencePerformance
);

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.removeSciencePerformance
);

module.exports = router;