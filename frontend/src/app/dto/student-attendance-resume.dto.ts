export interface StudentAttendanceResumeDto {
  fullName:             string;
  totalNumberOfClasses: number;
  numberOfAttendances:  number;
  numberOfAbsences:     number;
  attendancePercentage: number;
  attendanceScore:      number;
}
