const bcrypt = require('bcryptjs');

const UserDB = require('../db-models/User');

const tokenActions = require("../utils/token-actions")
const errorHandler = require('../utils/error-handler')

module.exports.login = async (req, res) => {
    try {
        const email = (req.user || {}).email || req.body.email;

        if(!email) {
            res.status(404).json({
                message: 'Почта не найдена!'
            })
            return;
        }

        const user = await UserDB.findOne({
            email,
        });

        const passwordCheck = bcrypt.compareSync(req.body.password, user.password);

        if (!user || !passwordCheck) {
            res.status(404).json({
                message: 'Пользователь не найден!'
            })
            return;
        }

        res.status(200).json({
            user,
            authorizeToken: !req.user ? tokenActions.getBearerTokenForAuthorize(user) : null,
            token: tokenActions.getBearerTokenForActions(user),
        })
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.register = async (req, res) => {
    try {
        const foundUser = await UserDB.findOne({email: req.body.email});

        if(foundUser) {
            res.status(409).json({
                message: 'Такая почта уже зарегистрирована!'
            })
            return;
        }

        const user = new UserDB({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            type: req.body.type,
        });

        await user.save();
        res.status(201).json({
            user,
            authorizeToken: tokenActions.getBearerTokenForAuthorize(user),
            token: tokenActions.getBearerTokenForActions(user),
        })
    }
    catch(e) {
        errorHandler(res, e);
    }
}