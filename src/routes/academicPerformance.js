const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require("../contollers/academicPerformance");

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.getAllAcademicPerformances
);

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.createAcademicPerformance
);

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.updateAcademicPerformance
);

module.exports = router;