const SciencePerformancesDB= require('../db-models/SciencePerformance');
const StudentsDB= require('../db-models/Student');
const SciencePerformanceDto = require("./SciencePerformance")
const Student = require("./Student");

module.exports = class GroupDto {
    constructor(
        id,
        name,
        dateStart,
        dateEnd,
        students,
        sciencePerformances,
    ) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.students = students;
        this.sciencePerformances = sciencePerformances;
    }

    static async toDto(data) {
        const sciencePerformances = await SciencePerformancesDB.find({ groupId: data._id });

        const sciencePerformancesDto = [];
        for(let i = 0; i < sciencePerformances.length; i++ ) {
            const sciencePerformanceDto = await SciencePerformanceDto.toDto(sciencePerformances[i]);
            sciencePerformancesDto.push(sciencePerformanceDto)
        }

        const students = await StudentsDB.find({ groupId: data._id });
        const studentsDto = students.map(it => Student.toDto(it));

        return new GroupDto(
            data._id,
            data.name,
            data.dateStart,
            data.dateEnd,
            studentsDto.sort((a, b) => a.name.localeCompare(b.name)),
            sciencePerformancesDto,
        );
    }
}