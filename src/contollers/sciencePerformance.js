const SciencePerformanceDB = require("../db-models/SciencePerformance")
const GroupDB = require("../db-models/Group")
const AcademicPerformanceDB = require("../db-models/AcademicPerformance")
const errorHandler = require('../utils/error-handler')
const SciencePerformanceDto = require("../models/SciencePerformance");

module.exports.getAllSciencePerformances = async (req, res) => {
    try {
        const sciencePerformances = await SciencePerformanceDB.find();
        const sciencePerformancesDto = [];
        for(let i = 0; i < sciencePerformances.length; i++ ) {
            const sciencePerformanceDto = await SciencePerformanceDto.toDto(sciencePerformances[i]);
            sciencePerformancesDto.push(sciencePerformanceDto);
        }
        res.status(200).json(sciencePerformancesDto);
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.createSciencePerformance = async (req, res) => {
    try {
        const foundSciencePerformance = await SciencePerformanceDB.find({
            scienceId: req.body.scienceId,
            groupId: req.body.groupId,
        })
        if (foundSciencePerformance) {
            res.status(409).json({
                message: 'Такой предмет уже существует!'
            });
            return;
        }

        const sciencePerformance = new SciencePerformanceDB({
            scienceId: req.body.scienceId,
            groupId: req.body.groupId,
            academicPerformances: [],
        });

        await sciencePerformance.save();
        const sciencePerformanceDto = await SciencePerformanceDto.toDto(sciencePerformance)

        res.status(201).json(sciencePerformanceDto);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updateSciencePerformance = async (req, res) => {
    try {
        await SciencePerformanceDB.findByIdAndUpdate({
                _id: req.params.id
            },
            {
                academicPerformances: req.body.academicPerformances,
            });
        const sciencePerformance = await SciencePerformanceDB.findById(req.params.id);

        res.status(200).json(SciencePerformanceDto.toDto(sciencePerformance));
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.removeSciencePerformance = async (req, res) => {
    try {
        const sciencePerformance = await SciencePerformanceDB.findById(req.params.id);
        const targetGroup = await GroupDB.findById(sciencePerformance.groupId);

        await GroupDB.findByIdAndUpdate(sciencePerformance.groupId, {
            sciencePerformances: targetGroup.sciencePerformances.filter((itemId) => itemId !== req.params.id)
        })

        for(let i = 0; i < sciencePerformance.academicPerformances.length; i++) {
            const itemId = sciencePerformance.academicPerformances[i];
            await AcademicPerformanceDB.findByIdAndRemove(itemId);
        }

        await SciencePerformanceDB.findByIdAndRemove(req.params.id);

        res.status(200).json();
    } catch (e) {
        errorHandler(res, e);
    }
}
