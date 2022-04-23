export class Schedule {
    constructor(
        room,
        science,
        teacher,
        groupName,
        start,
        end,
        date,
    ) {
    }

    static fromDto(dto) {
        return new Schedule(
            dto.aydit,
            dto.name.split("<br />")[0],
            dto.name.split("<br />")[1],
            dto.namegroup,
            dto.timestart,
            dto.timefinish,
            dto.date,
        )
    }
}
