import { Component } from '@angular/core';
import { StudentContinuousEvaluation, Subject, SubjectContinuousGrades } from 'src/app/interfaces/interfaces';
import { SubjectsService } from 'src/app/services/subjects.service';

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

  subject : Subject = {
    name: '',
    code: '',
    instructor: '',
    parallel: '',
    classes: []
  };

  getTaskGrade (student : StudentContinuousEvaluation, taskName : string) {
    const evaluation = student.continuousEvaluation.find(evaluation => evaluation.name === taskName);

    if (evaluation !== undefined)
      return evaluation.grade;

    return 0;
  }

  constructor(private subjectsService: SubjectsService) { 
    this.subjectsService.fetchSubjectContinuousEvaluation("").subscribe((response: SubjectContinuousGrades) => {   
      this.evaluations = response.students;
      this.subject = response.subject

      this.displayedColumns.push('name');

      if (this.evaluations.length > 0) {
        for (let i = 0; i < this.evaluations[0].continuousEvaluation.length; i++) {
          this.tasksColumns.push(this.evaluations[0].continuousEvaluation[i].name);
          this.displayedColumns.push(this.evaluations[0].continuousEvaluation[i].name);
        }
      }

      this.displayedColumns.push('finalGrade');

    });
  }
}
