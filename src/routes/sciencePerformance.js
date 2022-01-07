const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require("../contollers/sciencePerformance");

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.getAllSciencePerformances
);

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.createSciencePerformance
);

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.updateSciencePerformance
);

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.removeSciencePerformance
);

module.exports = router;