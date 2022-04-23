export class Schedule {
    static fromDto(dto) {
        const schedule = new Schedule();

        schedule.room = dto.aydit;
        schedule.science = dto.name.split("<br />")[0];
        schedule.teacher = dto.name.split("<br />")[1];
        schedule.groupName = dto.namegroup;
        schedule.start = dto.timestart;
        schedule.end = dto.timefinish;
        schedule.date = dto.date;

        return schedule;
    }
}
