import { GraphValues } from "./graph-values";

export interface AbandonRatesDTO {
    byGrades: GraphValues[];
    byMonths: GraphValues[];
    bySubjects: GraphValues[];
}