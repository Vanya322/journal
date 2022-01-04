const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../db-models/User');
const keys = require('../config/keys')
const errorHandler = require('../utils/error-handler')

module.exports.login = async (req, res) => {

    const candidate = await User.findOne({
        email: req.body.email,
    });

    const passwordCheck = bcrypt.compareSync(req.body.password, candidate.password); // Шифруем пароль

    if(candidate && passwordCheck) {

        const token = jwt.sign(
            {
                email: candidate.email,
                userId: candidate._id,
            },
            keys.jwt,
            {
                expiresIn: 60 * 60 * 24 * 30
            }
        );

        res.status(200).json({
            token: `Bearer ${token}`
        })
    }
    else {
        res.status(404).json({
            message: 'This user not found!'
        })
    }

}

module.exports.register = async (req, res) => {

    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        res.status(409).json({
            message: 'User with this email already exists!'
        })
    }
    else {
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        });

        try {
            await user.save();
            res.status(201).json(user)
        }
        catch(e) {
            errorHandler(res, e);
        }

    }
}