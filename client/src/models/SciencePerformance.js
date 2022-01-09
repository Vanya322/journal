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

    static async fromDto(data) {
        return new SciencePerformance(
            data.id,
            Science.fromDto(data.science),
            data.academicPerformances.map(it => AcademicPerformance.fromDto(it)),
        );
    }
}