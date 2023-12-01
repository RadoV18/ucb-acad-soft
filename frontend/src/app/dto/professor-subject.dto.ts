import {ProfessorInfoDto} from "./professor-info.dto";
import {SubjectDto} from "./subject.dto";

export interface ProfessorSubjectDto {
  professor: ProfessorInfoDto;
  subjects: SubjectDto[];
}
