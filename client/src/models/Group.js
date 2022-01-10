import { SciencePerformance } from "./SciencePerformance";

export class Group {
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

    static fromDto(data) {
        return new Group(
            data.id,
            data.name,
            data.dateStart,
            data.dateEnd,
            data.sciencePerformances.map(it => SciencePerformance.fromDto(it)),
        );
    }
}