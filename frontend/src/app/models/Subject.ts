export interface Subject {
  site: string;
  careerSail: string;
  subjectSail: string;
  subjectName: string;
  parallel: number;
  academicCredits: number;
  economicCredits: number;
  continuousScore: number;
  reference: Reference;
  finalTestScore: number;
  finalScore: number;
}

export interface Reference {
  semester: number;
  year: number;
  turn: number;
}
