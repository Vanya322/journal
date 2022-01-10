import { SciencePerformance } from "./SciencePerformance";
import {Student} from "./Student";

export class Group {
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

    static fromDto(data) {
        const group = new Group(
            data.id,
            data.name,
            data.dateStart,
            data.dateEnd,
            [],
            [],
        );

        group.students = data.students.map(it => Student.fromDto(it, group))
        group.sciencePerformances = data.sciencePerformances.map(it => SciencePerformance.fromDto(it, group))


        return group;
    }
}