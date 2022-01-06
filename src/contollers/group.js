const GroupDB = require("../db-models/Group")
const errorHandler = require('../utils/error-handler')
const { GroupDto } = require("../models/Group");

module.exports.getAllGroups = async (req, res) => {
    try {
        const groups = await GroupDB.find();
        const groupsDtp = groups.map(async (it) => await GroupDto.toDto(it));
        res.status(200).json(groupsDtp)
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getGroupById = async (req, res) => {
    try {
        const group = GroupDB.findById(req.params.id);
        const groupDtp = await GroupDto.toDto(group);
        res.status(200).json(groupDtp)
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.createGroup = async (req, res) => {
    try {
        if (!req.body.name) {
            res.status(404).json({
                message: 'Имя не определено!'
            });
            return;
        }

        const foundGroup = await GroupDB.findOne({ name: req.body.name })
        if (foundGroup) {
            res.status(409).json({
                message: 'Такая группа уже существует!'
            });
            return;
        }

        const group = new GroupDB({
            name: req.body.name,
            sciencePerformances: req.body.sciencePerformances,
        });

        await group.save();

        const groupDto = await GroupDto.toDto(group);

        res.status(201).json(groupDto);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updateGroup = async (req, res) => {
    try {
        await GroupDB.findByIdAndUpdate({
            _id: req.params.id
        },
        {
            name: req.body.name,
            sciencePerformances: req.body.sciencePerformances,
        });
        const group = await GroupDB.findById(req.params.id);
        const groupDto = await GroupDto.toDto(group);

        res.status(200).json(groupDto);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.removeGroup = async (req, res) => {
    try {
        await GroupDB.findByIdAndRemove(req.params.id);

        res.status(200);
    } catch (e) {
        errorHandler(res, e);
    }
}
