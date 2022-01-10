const StudentDB = require("../db-models/Student")
const errorHandler = require('../utils/error-handler')
const StudentDto = require("../models/Student");
const AcademicPerformanceDB = require("../db-models/AcademicPerformance");

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
        if (!req.body.name) {
            res.status(404).json({
                message: 'Не указано имя!'
            });
            return;
        }

        const student = new StudentDB({
            name: req.body.name,
            groupId: req.body.groupId,
            birthday: req.body.birthday,
            studentTicket: req.body.studentTicket,
            academicBook: req.body.academicBook,
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
                studentTicket: req.body.studentTicket,
                academicBook: req.body.academicBook,
            });
        const student = await StudentDB.findById(req.params.id);

        res.status(200).json(StudentDto.toDto(student));
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.removeStudent = async (req, res) => {
    try {
        const academicPerformances = await AcademicPerformanceDB.find({ studentId: req.params.id });
        for(let i = 0; i < academicPerformances.length; i++) {
            await AcademicPerformanceDB.findByIdAndRemove(academicPerformances[i]);
        }

        await StudentDB.findByIdAndRemove(req.params.id);

        res.status(200).json();
    } catch (e) {
        errorHandler(res, e);
    }
}
