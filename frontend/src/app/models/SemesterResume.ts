import {Subject} from "./Subject";

export interface SemesterResume {
  semesters: Semester[];
  summary: KardexBrief[];
}

export interface KardexBrief {
  concept: string;
  value: number;
}

export interface Semester {
  academicPeriod: string;
  initSemester: string;
  endSemester: string;
  career: string;
  subjects: Subject[];
  totalCredits: number;
  average: number;
}
