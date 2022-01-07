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
        const allAcademicPerformances= await AcademicPerformancesDB.find();
        const academicPerformances = allAcademicPerformances.filter((itemId) => (
            data.academicPerformances.includes(itemId)
        ));

        const science = await SciencesDB.findById(data.scienceId);

        return new SciencePerformanceDto(
            data._id,
            ScienceDto.toDto(science),
            academicPerformances.map(async (it) => await AcademicPerformanceDto.toDto(it)),
        );
    }
}