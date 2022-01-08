const StudentDB = require("../db-models/Student")
const errorHandler = require('../utils/error-handler')
const StudentDto = require("../models/Student");

module.exports.getAllStudents = async (req, res) => {
    try {
        const students = await StudentDB.find();
        res.status(200).json(students.map((it) => StudentDto.toDto(it)));
    } catch (e) {
        errorHandler(res, e);
    }
}
module.exports.createStudent = async (req, res) => {
    try {
        if (!req.body.name || !req.body.groupId || !req.body.birthday) {
            res.status(404).json({
                message: 'Не хватает данных!'
            });
            return;
        }

        const foundStudents = await StudentDB.find({
            name: req.body.name,
            groupId: req.body.groupId,
            birthday: req.body.birthday,
        });
        if (foundStudents.length) {
            res.status(409).json({
                message: 'Такой студент уже состоит в выбранной группе!'
            });
            return;
        }

        const student = new StudentDB({
            name: req.body.name,
            groupId: req.body.groupId,
            birthday: req.body.birthday,
        });

        await student.save();

        res.status(201).json(StudentDto.toDto(student));
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updateStudent = async (req, res) => {
    try {
        await StudentDB.findByIdAndUpdate({
                _id: req.params.id
            },
            {
                name: req.body.name,
                groupId: req.body.groupId,
                birthday: req.body.birthday,
            });
        const student = await StudentDB.findById(req.params.id);

        res.status(200).json(StudentDto.toDto(student));
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.removeStudent = async (req, res) => {
    try {
        await StudentDB.findByIdAndRemove(req.params.id);

        res.status(200).json();
    } catch (e) {
        errorHandler(res, e);
    }
}
