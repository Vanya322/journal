const AcademicPerformanceDto = require("./AcademicPerformance")
const ScienceDto = require("./Science")

const SciencesDB = require('../db-models/Science');
const AcademicPerformancesDB = require('../db-models/AcademicPerformance');

module.exports = class SciencePerformanceDto {
    constructor(
        id,
        science,
        academicPerformances,
    ) {
        this.id = id;
        this.science = science;
        this.academicPerformances = academicPerformances;
    }

    static async toDto(data) {
        const academicPerformances= await AcademicPerformancesDB.find({ sciencePerformanceId: data._id });

        const academicPerformancesDto = [];
        for(let i = 0; i < academicPerformances.length; i++ ) {
            const academicPerformanceDto = await AcademicPerformanceDto.toDto(academicPerformances[i]);
            academicPerformancesDto.push(academicPerformanceDto)
        }

        const science = await SciencesDB.findById(data.scienceId);

        return new SciencePerformanceDto(
            data._id,
            ScienceDto.toDto(science),
            academicPerformancesDto,
        );
    }
}