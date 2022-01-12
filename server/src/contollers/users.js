const UserDB = require("../db-models/User")
const errorHandler = require('../utils/error-handler')
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const UserDto = require("../models/UserDto");

module.exports.getAllUsers = async (req, res) => {
    try {
        const user = User.toModel(req.user)

        if (!user.isAdmin) {
            errorHandler(res, "Отказано в доступе!");
            return;
        }

        const users = await UserDB.find();
        res.status(200).json(
            users.map((it) => UserDto.toDto(it))
                .sort((a, b) => a.name.localeCompare(b.name))
        );
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.createUser = async (req, res) => {
    const user = User.toModel(req.user)

    if (!user.isAdmin) {
        errorHandler(res, "Отказано в доступе!");
        return;
    }

    try {
        if (!req.body.name) {
            res.status(404).json({
                message: 'Не указано имя!'
            });
            return;
        }

        const user = new UserDB({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            type: req.body.type,
        });

        await user.save();

        res.status(201).json(UserDto.toDto(user));
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updateUser = async (req, res) => {
    const user = User.toModel(req.user)

    if (!user.isAdmin) {
        errorHandler(res, "Отказано в доступе!");
        return;
    }

    const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        type: req.body.type,
    }

    const oldPassword = req.body.oldPassword;
    if (oldPassword) {
        const foundUser = await UserDB.findById(req.body.id);

        const passwordCheck = bcrypt.compareSync(oldPassword, foundUser.password);

        if (!passwordCheck) {
            res.status(404).json({
                message: 'Старый пароль не верен!'
            })
            return;
        }

        updatedUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }
    try {
        await UserDB.findByIdAndUpdate({ _id: req.params.id }, updatedUser);
        const user = await UserDB.findById(req.params.id);

        res.status(200).json(UserDto.toDto(user));
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.removeUser = async (req, res) => {
    const user = User.toModel(req.user)

    if (!user.isAdmin) {
        errorHandler(res, "Отказано в доступе!");
        return;
    }

    try {
        await UserDB.findByIdAndRemove(req.params.id);
        res.status(200).json();
    } catch (e) {
        errorHandler(res, e);
    }
}
