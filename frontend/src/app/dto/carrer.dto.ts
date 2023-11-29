
export interface DashboardCareerDto{
  id: number,
  name: string,
  careers: CareerDto[];

}
export interface CareerDto {
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

export interface DataDto {
    x: string;
    y: number;
}

export interface DashboardDto {
  data: [
    DataDto
  ];
}
