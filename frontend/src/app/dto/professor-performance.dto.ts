import {SemesterDto} from "./semester.dto";
import {ProfessorSubjectScoreDto} from "./professor-subject-score.dto";

export interface ProfessorPerformanceDto{
  semester: SemesterDto;
  subjects: ProfessorSubjectScoreDto[];
}
