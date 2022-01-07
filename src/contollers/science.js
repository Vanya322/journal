const ScienceDB = require("../db-models/Science")
const errorHandler = require('../utils/error-handler')
const ScienceDto = require("../models/Science");

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
        await ScienceDB.findByIdAndRemove(req.params.id);

        res.status(200).json();
    } catch (e) {
        errorHandler(res, e);
    }
}
