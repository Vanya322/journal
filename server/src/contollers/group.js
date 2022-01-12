const GroupDB = require("../db-models/Group")
const errorHandler = require('../utils/error-handler')
const GroupDto = require("../models/Group");
const SciencePerformanceDB = require("../db-models/SciencePerformance");
const AcademicPerformanceDB = require("../db-models/AcademicPerformance");
const User = require("../models/User");

module.exports.getAllGroups = async (req, res) => {
    try {
        const groups = await GroupDB.find();
        const groupsDto = [];
        for(let i = 0; i < groups.length; i++ ) {
            const groupDto = await GroupDto.toDto(groups[i]);
            groupsDto.push(groupDto)
        }

        res.status(200).json(groupsDto.sort((a, b) => a.name.localeCompare(b.name)))
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getGroupById = async (req, res) => {
    try {
        const group = await GroupDB.findById(req.params.id);
        const groupDto = await GroupDto.toDto(group);
        res.status(200).json(groupDto)
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.createGroup = async (req, res) => {
    const user = User.toModel(req.user)

    if (!user.isAdmin) {
        errorHandler(res, "Отказано в доступе!");
        return;
    }

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
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
        });

        await group.save();

        const groupDto = await GroupDto.toDto(group);

        res.status(201).json(groupDto);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updateGroup = async (req, res) => {
    const user = User.toModel(req.user)

    if (!user.isAdmin) {
        errorHandler(res, "Отказано в доступе!");
        return;
    }

    try {
        await GroupDB.findByIdAndUpdate({
            _id: req.params.id
        },
        {
            name: req.body.name,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
        });
        const group = await GroupDB.findById(req.params.id);

        const groupDto = await GroupDto.toDto(group);

        res.status(200).json(groupDto);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.removeGroup = async (req, res) => {
    const user = User.toModel(req.user)

    if (!user.isAdmin) {
        errorHandler(res, "Отказано в доступе!");
        return;
    }

    try {
        const sciencePerformances = await SciencePerformanceDB.find({ groupId: req.params.id });
        for(let i = 0; i < sciencePerformances.length; i++) {
            const sciencePerformance = sciencePerformances[i]

            for(let j = 0; j < sciencePerformance.academicPerformances.length; j++) {
                const itemId = sciencePerformance.academicPerformances[j];
                await AcademicPerformanceDB.findByIdAndRemove(itemId);
            }
            await SciencePerformanceDB.findByIdAndRemove(sciencePerformance._id);
        }

        await GroupDB.findByIdAndRemove(req.params.id);

        res.status(200).json();
    } catch (e) {
        errorHandler(res, e);
    }
}
