import { AcademicPerformance } from "./AcademicPerformance";
import { Science } from "./Science";

export class SciencePerformance {
    constructor(
        id,
        science,
        academicPerformances,
    ) {
        this.id = id;
        this.science = science;
        this.academicPerformances = academicPerformances;
    }

    static fromDto(data, group) {
        return new SciencePerformance(
            data.id,
            Science.fromDto(data.science),
            data.academicPerformances.map(it => AcademicPerformance.fromDto(it, group)),
        );
    }
}

export class SciencePerformanceDto {
    constructor(
        id,
        scienceId,
        groupId,
    ) {
        this.id = id;
        this.scienceId = scienceId;
        this.groupId = groupId;
    }

    static toDto(id, science, group) {
        return new SciencePerformanceDto(
            id,
            science.id,
            group.id,
        );
    }
}