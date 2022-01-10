const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require("../contollers/student");

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.getAllStudents
);

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.removeStudent
);

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.createStudent
);

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.updateStudent
);

module.exports = router;