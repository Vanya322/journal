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
        const sciencePerformances = await sciencePerformancesModel.find({ groupId: data.groupId });

        const sciencePerformancesDto = sciencePerformances.map(async (it) => {
            const sciencePerformance = await SciencePerformanceDto.toDto(it);
            return sciencePerformance;
        });

        return new GroupDto(
            data._id,
            data.name,
            data.dateStart,
            data.dateEnd,
            sciencePerformancesDto,
        );
    }
}