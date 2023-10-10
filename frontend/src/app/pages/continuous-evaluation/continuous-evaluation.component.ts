import { Component } from '@angular/core';
import { StudentContinuousEvaluation, Subject } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-continuous-evaluation',
  templateUrl: './continuous-evaluation.component.html',
  styleUrls: ['./continuous-evaluation.component.sass']
})
export class ContinuousEvaluationComponent {

  evaluations : StudentContinuousEvaluation[] = [ 
    {
      name : "Juan Perez",
      continuousEvaluation : [
        {
          name : "Tarea 1",
          grade : 9
        },
        {
          name : "Tarea 2",
          grade : 10
        },
        {
          name : "Tarea 3",
          grade : 5
        },
        {
          name : "Tarea 4",
          grade : 11
        }],
      finalGrade : 10 
    },
    {
      name : "Juan Pereza",
      continuousEvaluation : [
        {
          name : "Tarea 1",
          grade : 8
        },
        {
          name : "Tarea 2",
          grade : 1
        },
        {
          name : "Tarea 3",
          grade : 9
        },
        {
          name : "Tarea 4",
          grade : 10
        }],
      finalGrade : 10 
    }
  ]

  displayedColumns: string[] = [];
  tasksColumns: string[] = [];

  subject : Subject;

  getTaskGrade (student : StudentContinuousEvaluation, taskName : string) {
    const evaluation = student.continuousEvaluation.find(evaluation => evaluation.name === taskName);

    if (evaluation !== undefined)
      return evaluation.grade;

    return 0;
  }

  constructor() { 
    this.subject = {
      name: "Programacion 1",
      code: "CC3001",
      instructor: "Juan Perez",
      parallel: "1",
      classes: []
    }

    this.displayedColumns.push('name');

    if (this.evaluations.length > 0) {
      for (let i = 0; i < this.evaluations[0].continuousEvaluation.length; i++) {
        this.tasksColumns.push(this.evaluations[0].continuousEvaluation[i].name);
        this.displayedColumns.push(this.evaluations[0].continuousEvaluation[i].name);
      }
    }

    this.displayedColumns.push('finalGrade');
  }
}
