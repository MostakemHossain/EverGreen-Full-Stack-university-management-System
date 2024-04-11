import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignSchedules: TSchedule[],
  newSchedules: TSchedule,
) => {
  for (const schedule of assignSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);

    const newStartTime = new Date(`1970-01-01T${newSchedules.startTime}:00`);
    const newEndTime = new Date(`1970-01-01T${newSchedules.endTime}:00`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
