const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require("../contollers/group");

router.get('/',
    passport.authenticate('jwt', { session: false }),
    controller.getAllGroups
);

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    controller.getGroupById
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    controller.removeGroup
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    controller.createGroup
);

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    controller.updateGroup
);

module.exports = router;