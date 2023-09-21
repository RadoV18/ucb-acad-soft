import {Subject} from "./Subject";

export interface SemesterResume {
  academicPeriod: string;
  initSemester: string;
  endSemester: string;
  career: string;
  subjects: Subject[];
  totalCredits: number;
  average: number;
}
