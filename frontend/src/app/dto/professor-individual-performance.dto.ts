import {SubjectInfoDto} from "./subject-info.dto";
import {ProfessorInfoDto} from "./professor-info.dto";
import {ProfessorPerformanceDto} from "./professor-performance.dto";

export interface ProfessorIndividualPerformanceDto {
  professor: ProfessorInfoDto,
  performance: ProfessorPerformanceDto[]
}
