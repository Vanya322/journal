const sciencePerformancesModel = require('../db-models/SciencePerformance');
const SciencePerformanceDto = require("./SciencePerformance")

module.exports = class GroupDto {
    constructor(
        id,
        name,
        dateStart,
        dateEnd,
        sciencePerformances,
    ) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.sciencePerformances = sciencePerformances;
    }

    static async toDto(data) {
        const sciencePerformances = await sciencePerformancesModel.find({ groupId: data._id });

        const sciencePerformancesDto = [];
        for(let i = 0; i < sciencePerformances.length; i++ ) {
            const sciencePerformanceDto = await SciencePerformanceDto.toDto(sciencePerformances[i]);
            sciencePerformancesDto.push(sciencePerformanceDto)
        }

        return new GroupDto(
            data._id,
            data.name,
            data.dateStart,
            data.dateEnd,
            sciencePerformancesDto,
        );
    }
}