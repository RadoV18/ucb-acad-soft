import { Time } from "@angular/common";

export interface ClassItem {
    start: string
    end: string
    subject: string
    classroom: string
}

export interface ClassInfo {
    day: string
    start: string
    end: string
    classroom: string
}

export interface Subject {
    name: string
    code: string
    instructor: string
    //might need to find a better traduction for this
    parallel: string
    classes: ClassInfo[]
}


export interface ContinuousEvaluation { 
    name : string
    grade : number
}

export interface StudentContinuousEvaluation {
    name: string
    continuousEvaluation: ContinuousEvaluation[]
    finalGrade: number
}