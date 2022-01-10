const ScienceDB = require("../db-models/Science")
const errorHandler = require('../utils/error-handler')
const ScienceDto = require("../models/Science");
const SciencePerformanceDB = require("../db-models/SciencePerformance");
const AcademicPerformanceDB = require("../db-models/AcademicPerformance");

module.exports.getAllSciences = async (req, res) => {
    try {
        const sciences = await ScienceDB.find();
        res.status(200).json(sciences.map((it) => ScienceDto.toDto(it)));
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.createScience = async (req, res) => {
    try {
        if (!req.body.name) {
            res.status(404).json({
                message: 'Имя не определено!'
            });
            return;
        }

        const foundScience = await ScienceDB.findOne({ name: req.body.name })
        if (foundScience) {
            res.status(409).json({
                message: 'Такой предмет уже существует!'
            });
            return;
        }

        const science = new ScienceDB({ name: req.body.name });

        await science.save();

        res.status(201).json(ScienceDto.toDto(science));
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updateScience = async (req, res) => {
    try {
        await ScienceDB.findByIdAndUpdate({
            _id: req.params.id
        },
        {
            name: req.body.name,
        });
        const science = await ScienceDB.findById(req.params.id);

        res.status(200).json(ScienceDto.toDto(science));
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.removeScience = async (req, res) => {
    try {
        const sciencePerformances = await SciencePerformanceDB.find({ scienceId: req.params.id });
        for(let i = 0; i < sciencePerformances.length; i++) {
            const sciencePerformance = sciencePerformances[i]
            const academicPerformances = await AcademicPerformanceDB.find({
                sciencePerformanceId: sciencePerformance._id
            })

            for(let i = 0; i < academicPerformances.length; i++) {
                const itemId = academicPerformances[i];
                await AcademicPerformanceDB.findByIdAndRemove(itemId);
            }
            await SciencePerformanceDB.findByIdAndRemove(sciencePerformance._id);
        }

        await ScienceDB.findByIdAndRemove(req.params.id);

        res.status(200).json();
    } catch (e) {
        errorHandler(res, e);
    }
}
