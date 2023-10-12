import { Component } from '@angular/core';
import { StudentContinuousEvaluation, Subject, SubjectContinuousGrades } from 'src/app/interfaces/interfaces';
import { SubjectsService } from 'src/app/services/subjects.service';
import {StudentListService} from "../../services/student-list.service";
import {SubjectDto} from "../../dto/subject.dto";
import {ContinuosEvaluationService} from "../../services/continous-evaluation/continuos-evaluation.service";

@Component({
  selector: 'app-continuous-evaluation',
  templateUrl: './continuous-evaluation.component.html',
  styleUrls: ['./continuous-evaluation.component.sass']
})
export class ContinuousEvaluationComponent {
  professorId = 1;
  semesterId = 4;

  subjectListDto : SubjectDto[] = []

  displayedColumns: string[] = ['name', 'detail'];



  constructor(private studentListService: StudentListService, private continuousEvalaution: ContinuosEvaluationService ) { }


  ngOnInit(): void {
    this.studentListService.getSubjectsByProfessorIdAndSemesterId(this.professorId, this.semesterId).subscribe({
      next: (data) => {
        this.subjectListDto = data.data!;
        console.log(this.subjectListDto);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  downloadReport(): void {
    console.log("downloadReport");
    this.continuousEvalaution.getContinuosEvaluation().subscribe((response) => {
      const data = response.data;
      window.open(data, "_blank");
    })
  }



}
