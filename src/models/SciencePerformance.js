const AcademicPerformanceDto = require("./AcademicPerformance").AcademicPerformanceDto
const ScienceDto = require("./Science").ScienceDto

const sciencesModel = require('../db-models/Science');
const academicPerformancesModel = require('../db-models/AcademicPerformance');

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
        const allAcademicPerformances= await academicPerformancesModel.find();
        const academicPerformances = allAcademicPerformances.filter((itemId) => (
            data.academicPerformances.includes(itemId)
        ));

        const science = await sciencesModel.findById(data.scienceId);

        return new SciencePerformanceDto(
            data._id,
            ScienceDto.toDto(science),
            academicPerformances.map(async (it) => await AcademicPerformanceDto.toDto(it)),
        );
    }
}