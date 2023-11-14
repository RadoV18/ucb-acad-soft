export interface CarrerDto {
    id: number;
    name: string;
    subjects: SubjectDto[];
}

export interface SubjectDto {
    id: number;
    name: string;
    parallels: ParallelDto[];
}

export interface ParallelDto {
    id: number;
    parallelNumber: number;
    professor: string;
}


export interface DashboardDto {
  data: [
    {
      x: string;
      y: number;
    },
    {
      x: string;
      y: number;
    }
  ];
}
