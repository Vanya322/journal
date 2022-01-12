const SciencePerformanceDB = require("../db-models/SciencePerformance")
const AcademicPerformanceDB = require("../db-models/AcademicPerformance")
const errorHandler = require('../utils/error-handler')
const SciencePerformanceDto = require("../models/SciencePerformance");
const User = require("../models/User");

module.exports.createSciencePerformance = async (req, res) => {
    const user = User.toModel(req.user)

    if (!user.isAdmin) {
        errorHandler(res, "Отказано в доступе!");
        return;
    }

    try {
        const foundSciencePerformances = await SciencePerformanceDB.find({
            scienceId: req.body.scienceId,
            groupId: req.body.groupId,
        })
        if (foundSciencePerformances.length) {
            res.status(409).json({
                message: 'Такой предмет уже существует!'
            });
            return;
        }

        const sciencePerformance = new SciencePerformanceDB({
            scienceId: req.body.scienceId,
            groupId: req.body.groupId,
        });

        await sciencePerformance.save();
        const sciencePerformanceDto = await SciencePerformanceDto.toDto(sciencePerformance)

        res.status(201).json(sciencePerformanceDto);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.removeSciencePerformance = async (req, res) => {
    const user = User.toModel(req.user)

    if (!user.isAdmin) {
        errorHandler(res, "Отказано в доступе!");
        return;
    }

    try {
        const academicPerformances = await AcademicPerformanceDB.find({
            sciencePerformanceId: req.params.id
        })

        for(let i = 0; i < academicPerformances.length; i++) {
            const itemId = academicPerformances[i];
            await AcademicPerformanceDB.findByIdAndRemove(itemId);
        }

        await SciencePerformanceDB.findByIdAndRemove(req.params.id);

        res.status(200).json();
    } catch (e) {
        errorHandler(res, e);
    }
}
