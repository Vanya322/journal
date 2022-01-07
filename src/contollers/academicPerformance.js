const AcademicPerformanceDB = require("../db-models/AcademicPerformance")
const errorHandler = require('../utils/error-handler')
const AcademicPerformanceDto = require("../models/AcademicPerformance");

module.exports.getAllAcademicPerformances = async (req, res) => {
    try {
        const academicPerformances = await AcademicPerformanceDB.find();
        const academicPerformancesDto = [];
        for(let i = 0; i < academicPerformances.length; i++ ) {
            const academicPerformanceDto = await AcademicPerformanceDto.toDto(academicPerformances[i]);
            academicPerformancesDto.push(academicPerformanceDto);
        }
        res.status(200).json(academicPerformancesDto);
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.createAcademicPerformance = async (req, res) => {
    try {
        const foundAcademicPerformance = await AcademicPerformanceDB.find({
            sciencePerformanceId: req.body.sciencePerformanceId,
            studentId: req.body.studentId,
            date: req.body.date,
        })
        if (foundAcademicPerformance) {
            res.status(409).json({
                message: 'Ошибка!'
            });
            return;
        }

        const academicPerformance = new AcademicPerformanceDB({
            sciencePerformanceId: req.body.sciencePerformanceId,
            studentId: req.body.studentId,
            date: req.body.date,
            performance: req.body.performance,
        });

        await academicPerformance.save();
        const academicPerformanceDto = await AcademicPerformanceDto.toDto(academicPerformance)

        res.status(201).json(academicPerformanceDto);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updateAcademicPerformance = async (req, res) => {
    try {
        await AcademicPerformanceDB.findByIdAndUpdate({
            _id: req.params.id
        },
        {
            performance: req.body.performance,
        });
        const academicPerformance = await AcademicPerformanceDB.findById(req.params.id);

        res.status(200).json(AcademicPerformanceDto.toDto(academicPerformance));
    } catch (e) {
        errorHandler(res, e);
    }
}
