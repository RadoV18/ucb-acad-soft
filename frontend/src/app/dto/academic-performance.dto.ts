import {SubjectInfoDto} from "./subject-info.dto";

export interface AcademicPerformanceDto {
  subjects: SubjectInfoDto[];
  totalStudents: number;
  totalStudentsWithScoresFrom0to40: number;
  totalStudentsWithScoresFrom41to60: number;
  totalStudentsWithScoresFrom61to90: number;
  totalStudentsWithScoresFrom91to100: number;
}
