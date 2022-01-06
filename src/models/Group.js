const sciencePerformancesModel = require('../db-models/SciencePerformance');
const SciencePerformanceDto = require("./SciencePerformance").SciencePerformanceDto

module.exports = class GroupDto {
    constructor(
        id,
        name,
        sciencePerformances,
    ) {
        this.id = id;
        this.name = name;
        this.sciencePerformances = sciencePerformances;
    }

    static async toDto(data) {
        const allSciencePerformances = await sciencePerformancesModel.find();

        const sciencePerformances = allSciencePerformances.filter((it) => (
            data.sciencePerformances.includes(it._id)
        )).map(async (it) => await SciencePerformanceDto.toDto(it));

        return new GroupDto(
            data._id,
            data.name,
            sciencePerformances,
        );
    }
}