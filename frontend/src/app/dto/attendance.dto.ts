import {StudentAttendanceDto} from "./student-attendance.dto";

export interface AttendanceDto {
  date:     Date;
  students: StudentAttendanceDto[];
}
